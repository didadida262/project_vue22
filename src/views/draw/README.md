# Main页面

包含所有与 Main 页面相关的文档。



## 部分细节


#### 按钮逻辑

###### MAPPING 按钮
1、在 SETUP 完成后，前端需要根据 casstte 的填写信息，判断 MAP1和MAP2按钮是否可以点击。
比如“如果 cassette2 没填，MAP2 按钮就不允许用户点击”。

2、在 MAPPING 已完成结果一致的时候，需要判断是不是填写了 wafer 的casstte 都 MAP 完成的。
比如“如果 cassette1 和 cassette2 都填写了，用户点击了 MAP1 完成了第一个 MAPPING，这时候还没点 MAP，不应该允许用户点【ALIGN】按钮”。

这里前端的数据分在不同组件中不好取，因此根据后端在 state-machine 的 `data` 字段返回内容中添加：
1、`need_mapping`：是否需要执行 MAPPING 操作；
2、`mapped`：是否已经执行了 MAPPING 操作；


#### 接口请求时机
在 Main 页面的各个区域都需要进行数据获取，其中部分区域的接口请求时机有特殊性。

主要获取内容如下：
- 1、获取左上方 cassette 信息
- 2、获取左下方 System 信息
- 3、获取中间上方 wafer 信息
- 4、获取中间下方 BF/PL 图
- 5、获取中间上方大圆缺陷信息（同右侧上方缺陷列表）
- 6、获取中间上方大圆缺陷类别信息
- 7、获取中间上方大圆实时扫描区域小红框信息
- 8、获取右侧下方日志信息

###### 4、获取中间下方 BF/PL 图
需求定为，只有扫描阶段（系统状态码为 `1205411 检测开始` 和 `1205512 检测完成`）才获取。

更新：2023-01-16，由于存在从 Review 页面切换为 Main 页面的情况，这时候即使不在扫描阶段，也要获取 BF/PL 图。
因此将之前的 `getRealTime()` 方法拆分为两个：
- `getRealTime()`：纯粹地调用API并赋相关变量操作；
- `getRealTimeWhenScanning()`：首先判断扫描阶段，符合条件时再进行 `getRealTime` 操作。

其中直接使用 `getRealTime` 方法的时机是 `getData()`，即页面刷新初始化时的操作；
使用 `getRealTimeWhenScanning` 方法的时机是 `pollingSystemStatus`，即定时请求的逻辑。


#### 弹窗创建、维护、消失时机
当前 Main 页面所有的弹窗分为两种类型：`报警弹窗` 和 `状态弹窗`。
其中 `报警弹窗` 在设备端发生错误时（系统状态中 `device_error_code` 不为空时）产生，无法关闭，只能点击 `RESET` 按钮执行重置，或等待系统状态恢复正常。
其中 `状态弹窗` 则是设备每一个状态流转过程中的提示信息，根据状态的不同展现形式和生命周期各不相同，主要是以系统状态中的 `code` 为判断依据。

###### 报警弹窗
当系统状态中包含 `device_error_code` 时，必然在主页面显示报警弹窗。   
弹窗统一不可关闭，统一置 RESET 按钮，用户在弹窗时只有两种选项：
- 点击 RESET 按钮，进行重置操作；
- 等待机器恢复，当下一次获取系统状态若 `device_error_code` 为空时，弹窗自动消失。

前端处理报警弹窗的逻辑在 `src\layouts\basic-layout\Header\components\OperationButtons.vue` 文件的`handleSystemErrDialog` 方法中。
报警弹窗的样式在 `src\layouts\basic-layout\Header\components\SystemStateDialog.vue` 文件中。

在每一次进行系统状态获取后，都会向父组件传递 `显示弹窗` 或 `隐藏弹窗` 的事件，控制当前时刻报警弹窗的显隐。

当前时间节点（2022-11-14），所有设备状态错误，都允许用户点击 `RESET` 按钮进行重置。由此带来的问题时，可能用户在点击之后错误依然存在，将进入一个循环。

###### 状态弹窗
大部分状态是由系统状态中 `code` 字段确定，会根据实际情况弹出对应的提示（Notification）或弹窗（Dialog）。
相关逻辑在 `src\layouts\basic-layout\Header\utils\notification_logic.ts` 的 `getNotificationMessage` 方法中确定。根据系统状态信息，包括 `code` 和 `data` 字段中的内容，将返回一个类似下面数据的结构体：
```
{
    type: MessageTypeEnum.Notification,
    text: 'EFEM door opened.'
}
``` 
其中 `type` 字段类型为 `MessageTypeEnum`，包括 5 种可能取值，分别表示 `无提示`、`通过对话框提示`、`通过右上方通知提示`、`通过一个自动消失的对话框提示` 和 `不可关闭的弹窗`。    
20221124更新：添加第 5 种弹窗，表示 `不可关闭的弹窗`。

```
const MessageTypeEnum = {
  'None': 0,
  'Dialog': 1,
  'Notification': 2,
  'DialogAutoClosing': 3,
  'DialogCannotClose': 4
}
```

但有两种状态 `Mapping结果不一致` 和 `Align结果不一致` 是由额外逻辑控制的，后续描述。

`Mapping结果不一致` 的状态通过 `code` 判定，需要结合 `data` 里的信息填充对话框中的内容。
`Align结果不一致` 的状态通过 `aligning_fail_data` 判定（因为这个弹窗不能因为状态的变化而消失），需要结合 `aligning_fail_data` 里的信息填充对话框中的内容。

此外，`Setuping` 状态也是特殊的，在这种情况下不允许点击 `PAUSE` 按钮进行暂停操作，因此需要弹出不可关闭的弹窗控制用户行为。    
相关逻辑通过 `StateDialogCannotClose.vue` 组件及 `OperationButtons.vue` 组件中的 `stateDialogCannotCloseVisible` 和 `stateDialogCannotCloseMessage` 变量控制。

###### 状态记录
由于每一次调用后台 API 查询系统状态时，都会进行相关状态弹窗的处理，部分状态会弹出通知。    
为了避免系统处于同一状态而 API 多次调用导致多次弹窗，前端会记录前序状态的信息，如果当前状态与前序状态相同，则不会重复弹出框。   
在 `src\layouts\basic-layout\Header\components\OperationButtons.vue` 组件中，使用 `recordLastNotificationInfo` 方法记录前序状态。需要注意的是，虽然这里的名称只提到了 `Code`，但实际上还会利用上其中的 `data` 信息，因为在 `Mapping 结果一致` 等状态时，需要利用 `data` 中的 `cassette_index` 判断前后两个状态。
相关逻辑可参考 `checkDifferentFromLastNotificationInfo` 方法。

更新：2023-01-17
在前端中，记录内容可以存在三个地，分别对应了不同生命周期的维护时长：
- 当前页面的变量中：切换页面消失；
- vuex中：切换页面不消失，刷新页面消失；
- LocalStorage/SessionStorage中：切换页面/刷新页面不消失；

此前将所有状态记录在 `OperationButtons.vue` 组件中的变量里。如果一直停留在 Main 页面，则逻辑是符合预期的，但是如果在 Main 页面和 Review 页面之间来回切换，则无法利用上存储的信息，每次切换时都会重新开始记录，导致通知不断弹出，给用户不好的体验。
因此，本次改动，将状态记录的存储位置，由 `OperationButtons.vue` 的 `last_notification_info` 变量，迁移至 `vuex` 中，保存在 `src\store\modules\admin\modules\layout.js` 的 `mainPageLastNotificationInfo` 变量中。


