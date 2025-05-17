#!/usr/bin/env bash

# 函数：设置代理
set_proxy() {
    # 获取当前电脑的IP地址，这里假设你的网络接口是en0，你可能需要根据你的实际情况修改
    IP_ADDRESS=$(ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}' | cut -d ' ' -f2)

    # 检查IP地址是否获取成功
    if [ -z "$IP_ADDRESS" ]; then
        echo "无法获取IP地址，请检查网络设置。"
        exit 1
    fi

    # 用户输入的端口号，如果没有提供，则使用默认端口8888
    if [ "$#" -eq 2 ]; then
        PROXY_PORT=$2
    else
        PROXY_PORT=9090
    fi

    # 通过ADB设置代理
    adb shell settings put global http_proxy $IP_ADDRESS:$PROXY_PORT

    # 验证代理设置是否成功
    adb shell settings get global http_proxy

    echo "代理设置完成，IP地址为: $IP_ADDRESS 端口为: $PROXY_PORT"
}

# 函数：清除代理
unset_proxy() {
    # 通过ADB删除代理设置
    adb shell settings put global http_proxy :0

    # 验证代理设置是否已删除
    adb shell settings get global http_proxy

    echo "代理设置已删除"
}

# 检查参数
if [ "$#" -lt 1 ]; then
    echo "使用方法：$0 [on|off] [端口号]"
    exit 1
fi

# 根据参数执行相应的函数
case "$1" in
    on)
        if [ "$#" -eq 2 ]; then
            set_proxy $@
        else
            set_proxy
        fi
        ;;
    off)
        unset_proxy
        ;;
    *)
        echo "无效参数：$1"
        echo "使用方法：$0 [on|off] [端口号]"
        exit 1
        ;;
esac