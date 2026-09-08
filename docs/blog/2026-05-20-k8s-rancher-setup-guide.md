---
title: 从零到一：在 Ubuntu 24.04 上搭建 Kubernetes v1.35 与 Rancher 管理平台
date: 2026-05-20
tags:
  - kubernetes
  - rancher
  - devops
description: 在单节点 Ubuntu 服务器上，从零安装 Kubernetes v1.35 到 Rancher 容器管理平台部署的全过程，涵盖镜像加速、Ingress 优化等实战经验。
category: 运维
---

本文记录了在单节点 Ubuntu 服务器上，从零安装 Kubernetes v1.35 到 Rancher 容器管理平台部署的全过程，涵盖了镜像加速、Ingress 优化等实战经验。

## 1. 环境准备

- **操作系统**: Ubuntu 24.04 LTS (Noble Numbat)
- **节点配置**: 8 Core / 24GB RAM（单节点测试环境）
- **目标版本**: Kubernetes v1.35.5, Rancher v2.10

## 2. Kubernetes 集群安装

### 2.1 配置阿里云镜像源

添加阿里云提供的 Kubernetes v1.35 稳定版软件源：

```bash
# 添加 GPG 密钥
curl -fsSL https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.35/deb/Release.key \
  | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg --yes

# 添加软件源
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.35/deb/ /" \
  | tee /etc/apt/sources.list.d/kubernetes.list
```

### 2.2 安装 K8s 组件

```bash
apt-get update
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl
```

### 2.3 初始化集群

使用阿里云容器镜像仓库进行初始化，加速镜像下载：

```bash
kubeadm init \
  --image-repository=registry.aliyuncs.com/google_containers \
  --pod-network-cidr=10.244.0.0/16
```

## 3. 基础环境优化

### 3.1 部署 repimage 镜像加速

为了解决后续国外镜像（gcr.io、quay.io 等）拉取慢的问题，部署了 `repimage`。它利用 **Mutating Admission Webhook** 机制，在 Pod 创建时自动将镜像前缀替换为国内加速器（如 `m.daocloud.io`）。

### 3.2 节点污点处理

作为单节点集群，需要移除 Master 节点的污点以允许调度业务 Pod：

```bash
kubectl taint nodes --all node-role.kubernetes.io/control-plane-
```

## 4. 部署 Rancher 管理平台

采用 Helm 方式在集群内安装 Rancher。

### 4.1 安装 Ingress Controller

为了方便通过 IP 直接访问，安装 Nginx Ingress 并启用 `hostNetwork`：

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace \
  --set controller.hostNetwork=true \
  --set controller.kind=DaemonSet
```

### 4.2 安装 Cert-Manager

Rancher 依赖 `cert-manager` 自动化管理 TLS 证书：

```bash
helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set installCRDs=true
```

### 4.3 安装 Rancher

使用 `sslip.io` 动态域名绕过 DNS 配置：

```bash
helm upgrade --install rancher rancher-stable/rancher \
  --namespace cattle-system --create-namespace \
  --set hostname=10.100.11.80.sslip.io \
  --set replicas=1 \
  --set bootstrapPassword=admin
```

## 5. 常见问题排查

### 5.1 访问报 404

**原因**: Ingress 规则中定义了 `host` 限制，且未指定 `ingressClassName`。

**解决**:

1. 确保 Ingress 资源中包含 `spec.ingressClassName: nginx`。
2. 若需直接通过 IP 访问，需 Patch 掉 Ingress 中的 `host` 限制和 `tls.hosts` 限制。

### 5.2 访问报 503

**原因**: Rancher Pod 尚未完全启动（Ready 0/1），或者正在生成证书。

**解决**: 等待 Pod 状态变为 `1/1 Running`。Rancher 启动较重，通常需要 2-3 分钟。

### 5.3 出现大量 helm-operation Pod

**原因**: Rancher 启动时会通过 Helm Controller 自动安装内部插件（Fleet、Webhook 等）。

**说明**: 这是正常现象，看到 Pod 处于 `Completed` 状态即表示对应插件安装成功。

---

至此，一套完整的 Kubernetes + Rancher 容器管理环境已搭建完成。
