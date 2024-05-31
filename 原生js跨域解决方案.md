1. **JSONP（JSON with Padding）**：

```
javascriptCopy Codefunction jsonp(url, callback) {
    // 创建一个 script 元素
    var script = document.createElement('script');
    // 设置 script 的 src 属性为目标 URL，并指定回调函数的名称
    script.src = url + '?callback=' + callback;
    // 将 script 添加到文档中
    document.body.appendChild(script);
}

// 调用 jsonp 函数
jsonp('http://example.com/api/data', 'handleData');

// 定义回调函数
function handleData(data) {
    console.log('Received data:', data);
}
```

1. **CORS（Cross-Origin Resource Sharing）**：

```
javascriptCopy Codevar xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/api/data', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Received data:', xhr.responseText);
    }
};
xhr.send();
```

1. **代理服务器**： 这里提供的是前端的示例代码。代理服务器的实现方式取决于后端语言和框架。

```
javascriptCopy Codevar xhr = new XMLHttpRequest();
xhr.open('GET', '/proxy?url=http://example.com/api/data', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Received data:', xhr.responseText);
    }
};
xhr.send();
```

1. **WebSocket**： WebSocket 的实现需要服务端和客户端的配合。以下是客户端的示例代码。

```
javascriptCopy Codevar socket = new WebSocket('ws://example.com/socket');
socket.onmessage = function(event) {
    console.log('Received message:', event.data);
};
```

1. **跨域资源共享 Iframe**：

```
javascriptCopy Code// 在父页面中
var iframe = document.createElement('iframe');
iframe.src = 'http://example.com/iframe';
document.body.appendChild(iframe);

// 在 iframe 中的子页面中
window.parent.postMessage('Data from iframe', 'http://example.com');
```

这些是几种原生 JavaScript 解决跨域的方式的简单示例。在实际应用中，可能需要根据具体情况进行进一步的配置和处理。