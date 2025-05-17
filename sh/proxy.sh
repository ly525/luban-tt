#!/usr/bin/env bash

# 函数：获取当前电脑的活跃网络接口的IP地址
get_ip_address() {
    local IP_ADDRESS=""
    local INTERFACE_NAME=""

    # 首先尝试获取en0（通常是Wi-Fi）的IP地址
    local EN0_IP=$(ifconfig en0 2>/dev/null | grep inet | grep -v inet6 | awk '{print $2}' | head -n 1)

    # 然后尝试获取en1的IP地址（某些Mac上可能是以太网）
    local EN1_IP=$(ifconfig en1 2>/dev/null | grep inet | grep -v inet6 | awk '{print $2}' | head -n 1)

    # 再尝试获取en2的IP地址
    local EN2_IP=$(ifconfig en2 2>/dev/null | grep inet | grep -v inet6 | awk '{print $2}' | head -n 1)

    # 检查是否有可用的IP地址，按优先级使用
    if [ ! -z "$EN0_IP" ]; then
        IP_ADDRESS=$EN0_IP
        INTERFACE_NAME="en0"
    elif [ ! -z "$EN1_IP" ]; then
        IP_ADDRESS=$EN1_IP
        INTERFACE_NAME="en1"
    elif [ ! -z "$EN2_IP" ]; then
        IP_ADDRESS=$EN2_IP
        INTERFACE_NAME="en2"
    fi

    # 如果以上都没有获取到IP，尝试使用更通用的方法
    if [ -z "$IP_ADDRESS" ]; then
        # 获取默认路由接口的IP地址
        local DEFAULT_INTERFACE=$(route -n get default 2>/dev/null | grep interface | awk '{print $2}')
        if [ ! -z "$DEFAULT_INTERFACE" ]; then
            IP_ADDRESS=$(ifconfig $DEFAULT_INTERFACE 2>/dev/null | grep inet | grep -v inet6 | awk '{print $2}' | head -n 1)
            INTERFACE_NAME="$DEFAULT_INTERFACE"
        fi
    fi

    # 返回获取到的IP地址
    echo "$IP_ADDRESS"
}

# 函数：设置代理
set_proxy() {
    # 获取当前电脑的活跃网络接口的IP地址
    IP_ADDRESS=$(get_ip_address)

    # 检查IP地址是否获取成功
    if [ -z "$IP_ADDRESS" ]; then
        echo "无法获取IP地址，请检查网络设置。"
        exit 1
    fi

    # 确定使用的网络接口
    local INTERFACE=""
    for IF in en0 en1 en2; do
        if ifconfig $IF 2>/dev/null | grep -q "$IP_ADDRESS"; then
            INTERFACE=$IF
            echo "使用网络接口${INTERFACE}的IP地址"
            break
        fi
    done

    # 如果没有找到匹配的常用接口，尝试查找默认接口
    if [ -z "$INTERFACE" ]; then
        DEFAULT_INTERFACE=$(route -n get default 2>/dev/null | grep interface | awk '{print $2}')
        if [ ! -z "$DEFAULT_INTERFACE" ] && ifconfig $DEFAULT_INTERFACE 2>/dev/null | grep -q "$IP_ADDRESS"; then
            echo "使用默认网络接口${DEFAULT_INTERFACE}的IP地址"
        fi
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