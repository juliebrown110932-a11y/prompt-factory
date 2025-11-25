# Public 资源目录

## 📁 需要添加的文件

### 打赏二维码图片
- **文件名**: `donation-qr.png`
- **位置**: 放在此目录下（与本 README.md 同级）
- **要求**:
  - 格式: PNG
  - 建议尺寸: 至少 400x400 像素
  - 内容: 微信/支付宝收款码

### 完整路径示例
```
/home/user/prompt-factory/public/donation-qr.png
```

## 📝 添加方法

### 方法1: 使用命令行上传
```bash
# 将你的二维码图片复制到这个目录
cp /path/to/your/qrcode.png /home/user/prompt-factory/public/donation-qr.png
```

### 方法2: 使用 Git
```bash
# 在本地添加图片后推送
git add public/donation-qr.png
git commit -m "feat: 添加打赏二维码"
git push
```

## ✅ 验证
添加后，运行以下命令确认文件存在：
```bash
ls -lh /home/user/prompt-factory/public/donation-qr.png
```

应该看到文件大小和时间戳。
