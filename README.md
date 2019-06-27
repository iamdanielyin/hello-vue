# HELLO-VUE

## 项目安装

```
npm install
```

## 项目启动

```
npm start
```

## 需求描述

1. 实现图书信息的增删改查功能
1. 使用**表格组件**显示图书列表，使用**表单组件**显示图书详情

### 数据结构

图书信息的数据结构如下：

```
Book(图书档案) {
  Subject(名称) string
  Price(价格) number
  Date(购买日期) string
  IsDiscount(是否打折) boolean
  UserRemark(用户备注) integer
}
```

### 接口说明

- 查询图书：`GET /api/book`

```
curl -X GET \
  https://humansa.hofo.co/api/book
```

- 新增图书：`POST /api/book`

```
curl -X POST \
  https://humansa.hofo.co/api/book \
  -H 'Content-Type: application/json' \
  -d '{
    "Subject": "格林童话",
    "Price": 29.8,
    "Date": "2019-06-27T02:45:36.237Z",
    "IsDiscount": false,
    "UserRemark": "无"
}'
```

- 修改图书：`PUT /api/book`

```
curl -X PUT \
  https://humansa.hofo.co/api/book \
  -H 'Content-Type: application/json' \
  -d '{
    "cond": {
        "ID": 3
    },
    "doc": {
        "Price": 10.5,
        "UserRemark": "客户已预约"
    }
}'
```

- 删除图书：`DELETE /api/book`

```
curl -X DELETE \
  https://humansa.hofo.co/api/book \
  -H 'Content-Type: application/json' \
  -d '{
    "cond": {
        "ID": 5
    }
}'
```
