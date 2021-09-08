//做輪播圖
let index = 0;
let time = null;
let imgName = '';
let banner_img = document.querySelector('.banner img');
let circle = document.querySelectorAll('.circle_container span');
circle[index].style.backgroundColor = 'black';


function img_move(){
    index++;
    // console.log(index)
    change_banner()
}

//輪播圖開始
function start(){
    if(time == null){
        time = setInterval(img_move,2000);
    }
}
start()

// 輪播圖停止
function end(){
    clearInterval(time)
    time = null;
}

// 輪播圖函式
function change_banner(){
    if(index > 2){
        index = 0;
    }
    imgName = './images/banner_' + index + '.png';
    banner_img.src = imgName;
    // console.log(imgName)
    for(let i = 0; i < circle.length; i++){
        for(let j = 0; j < circle.length; j++){
            circle[j].style.backgroundColor = '';
        }
        circle[index].style.backgroundColor = 'black';
    }
}

// 小圓按鈕函式
circle.forEach((item,num)=>{
    item.addEventListener('click',function(){
        console.log(num);
        end();
        index = num;
        change_banner()
        start();
    })
})


// 購物頁

let items = document.querySelector('.commodity_container');
// console.log(items)
let arr = [
    { brand: "飛利浦", name: "S1232", price: 2090, url: './images/Philips_1232.png', 價位: 'low', id: 'A001'},
    { brand: "百靈", name: "190S", price: 1288, url: './images/braun_190s.png', 價位: 'low', id: 'A002'},
    { brand: "國際牌", name: "ES-LT2A-S", price: 3780, url: './images/panasonic_ES-LT2A-S.png', 價位: 'middle', id: 'A003'},
    { brand: "飛利浦", name: "S6820", price: 5988, url: './images/Philips_6820.png', 價位: 'high', id: 'A004'},
    { brand: "百靈", name: "B1000S", price: 4688, url: './images/braun_50-b1000s.png', 價位: 'middle', id: 'A005'},
    { brand: "國際牌", name: "ES-SL83-R", price: 2890, url: './images/panasonic_ES-SL83-R.png', 價位: 'low', id: 'A006'},
    { brand: "飛利浦", name: "SP9860", price: 24888, url: './images/Philips_9860.png', 價位: 'high', id: 'A007'},
    { brand: "百靈", name: "310S", price: 1988, url: './images/braun_310s.png', 價位: 'low', id: 'A008'},
    { brand: "國際牌", name: "ES-ST2S-K", price: 3088, url: './images/panasonic_ES-ST2S-K.png', 價位: 'middle', id: 'A009'},
    { brand: "飛利浦", name: "S5588", price: 4488, url: './images/Philips_s5588.png', 價位: 'middle', id: 'A0010'},
    { brand: "百靈", name: "M30", price: 788, url: './images/braun_m30.png', 價位: 'low', id: 'A0011'},
    { brand: "國際牌", name: "ES-ST6R-R", price: 4988, url: './images/panasonic_ES-ST6R-R.png', 價位: 'middle', id: 'A0012'},
];
// 渲染商品
function load_item(data){
    items.innerHTML = '';
    // console.log(data)
    data.forEach(function(item,index){
        items.innerHTML += 
        `<li class="item" id="${item.id}">
            <div class="item_container">
                <img class="commodity" src=${item.url}> 
                <div class="shopping">
                    <span class="shopping_txt">加入購物車</span>
                    <input type="hidden" value="${item.name}|${item.url}|${item.price}" id="value">
                </div>
            </div>
            <div class="detail">
                <p>品牌：` + item.brand + `</p>
                <p>型號：` + item.name + `</p>
                <p>價格：<span style="font-size: 16px;">` + item.price + `</span></p>
            </div>
        </li>
        `
    })
}
load_item(arr)

let state = {
    txt: '',
    // brand: '全部',
    price: '全部'
}

//篩選之按鈕變色
let price = document.querySelectorAll('.price');
let default_price = price[0];
default_price.style.backgroundColor = 'black';

for(let i = 0; i < price.length; i++){
    price[i].addEventListener('click',function(){
        for(let j = 0; j < price.length; j++){
            price[j].classList.remove('-on');
            price[j].style.backgroundColor = 'gray';
        }
        price[i].style.backgroundColor = 'black';
        price[i].classList.add('-on');
        state.price = this.id;
        // console.log(state.price);
        let newArr = choice_price(arr, state.price);
        // console.log(search_input(newArr, state.txt))
        load_item(search_input(newArr, state.txt));
        // console.log(search)
        go_shopping();
    })
}

//篩選
function choice_price(data, price){
    if(price == 'all'){
        return data
    }else if(price == 'low'){
        return data.filter(function(item, index){
            return price == item.價位;
        })
    }else if(price == 'middle'){
        return data.filter(function(item, index){
            return price == item.價位;
        })
    }else if(price == 'high'){
        return data.filter(function(item, index){
            return price == item.價位;
        })
    }
}

//搜索事件
let search = document.querySelector("#search");
search.addEventListener('input',function(){
    state.txt = this.value;
    // console.log(state.txt)
    // console.log(newArr)
    // let on = document.querySelector('.-on');
    // console.log(on.id)
    // if(this.value == ''){
    //     state.price = on.id;
    //     let newArr = choice_price(arr, state.price);
    //     load_item(search_input(newArr, state.txt));
    // }else{
    //     // console.log(state.txt)
    //     let newArr = search_input(arr, state.txt);
    //     load_item(search_input(newArr, state.txt));
    // }
    let get_on = document.querySelectorAll('span.price'); 
    for(let i = 0; i < get_on.length; i++){
        if(get_on[i].classList.contains('-on')){
            // console.log(get_on[i].id)
            state.price = get_on[i].id;
            let newArr = choice_price(arr, state.price);
            load_item(search_input(newArr, state.txt));
            go_shopping();
        } 
    }
})

function search_input(data, value){
    if(!value){
        return data;
    }else{
        return data.filter(function(item,index){
            return item.brand.indexOf(value) >= 0;
        })
    }
}

let storage = localStorage;
function go_shopping(){
    // 購物車點擊數字增加、彈窗
    let confirm_shopping = document.querySelectorAll('.shopping_txt');
    let checkout = document.querySelector('#checkout');
    let checkout_clear = document.querySelector('#checkout_clear')
    let checkout_container = document.querySelector('#checkout_container')
    let car_container = document.querySelector('.car_container');
    if(storage['addItemList'] == null){
        storage.setItem('addItemList','');
    }
    
    confirm_shopping.forEach((item,index)=>{
        item.addEventListener('click',function(){
            checkout.style.display = 'block';
            let item_id = this.parentNode.parentNode.parentNode.id;
            let item_info = this.parentNode.querySelector('input').value;
            additem(item_id,item_info);
            // console.log(item_id)
            // console.log(car_num)
        })
        // ,{once:true}
    })
    car_container.addEventListener('click',function(){
        checkout.style.display = 'block';
    })
    checkout_clear.addEventListener('click',function(){
        checkout.style.display = 'none';
    })
}
go_shopping();

//新增資料到localstorage裡
function additem(itemid,itemvalue){
    // console.log(itemvalue)
    if(storage[itemid]){
        alert('此商品已在購物車內囉!!')
    }else{
        storage['addItemList'] += `${itemid}, `;
        storage.setItem(itemid,itemvalue);
        show_checkout(itemid,itemvalue);
        let car_txt = document.querySelector('#car_txt');
        // 將localstorage的ID推入陣列裡並更新手推車的數字
        car_num.push(`${itemid}`)
        // console.log(car_num)
        car_txt.innerHTML = car_num.length;
    }
}

// 將localstorage中的資料放到購物欄內
function show_checkout(storageid,storagevalue){
    let new_li = document.createElement('li');
    new_li.classList.add('choice_item');
    new_li.classList.add(`${storageid}`)
    // console.log(checkout_container)
    checkout_container.append(new_li);
    let new_div = document.createElement('div');
    new_div.className = 'choice_detail';
    new_li.append(new_div);
    let new_img = `<img src=${storagevalue.split('|')[1]} class="choice_item_img">`
    // console.log(new_img)
    new_div.insertAdjacentHTML("beforebegin", new_img);
    let all_detail =
        `<p class="checkout_model">型號：` + storagevalue.split('|')[0] + `</p>
        <p class="checkout_price">價格：` + storagevalue.split('|')[2] + `</p>
        <div class="item_number">
            <img src="./images/reduce.png" class="reduce">
            <p class="choice_number">1</p>
            <img src="./images/add.png" class="add">
        </div>
        `;
    new_div.insertAdjacentHTML("beforeend", all_detail);
    let choice_clear = `<img src="./images/clear.png" class="clear">`;
    new_div.insertAdjacentHTML("afterend", choice_clear);

    //點擊商品數量數字增加&減少
    let count = 1;
    let add = document.querySelector(`.${storageid} .add`);
    let num = document.querySelector(`.${storageid} .choice_number`)
    let item_price = document.querySelector(`.${storageid} .checkout_price`);
    let reduce = document.querySelector(`.${storageid} .reduce`);
    let item_clear = document.querySelector(`.${storageid} .clear`);
    // console.log(item_price.innerHTML);
    // console.log(itemvalue.split('|')[2])
    add.addEventListener('click',function(){
        num.innerHTML = ++count;
        item_price.innerHTML = '價格：' + (storagevalue.split('|')[2] * num.innerHTML);
    })
    reduce.addEventListener('click',function(){
        num.innerHTML = --count;
        item_price.innerHTML = '價格：' + (storagevalue.split('|')[2] * num.innerHTML);
        // console.log(count)
        if(count == 0){
            if(!confirm('確認要刪除嗎？')){
                count = 1;
                num.innerHTML = count;
                // console.log(count);
                item_price.innerHTML = '價格：' + storagevalue.split('|')[2];
            }else{
                new_li.remove();
                storage.removeItem(`${storageid}`);
                storage['addItemList'] = storage['addItemList'].replace(`${storageid}, `,``);
                // 將localstorage的ID推入陣列裡並更新手推車的數字
                car_num.pop(`${storageid}`)
                car_txt.innerHTML = car_num.length;
            }
        }
    })
    item_clear.addEventListener('click',function(){
        if(confirm("確認要刪除嗎？")){
            new_li.remove();
            storage.removeItem(`${storageid}`);
            storage['addItemList'] = storage['addItemList'].replace(`${storageid}, `,``);   
            // 將localstorage的ID推入陣列裡並更新手推車的數字
            car_num.pop(`${storageid}`)
            // console.log(car_num.length)
            car_txt.innerHTML = car_num.length;
        }
    })

}

    // 清除全部購物紀錄
let clear_all_item = document.querySelector('.clear_all_item')
let choice_item = document.querySelectorAll('.choice_item')
// console.log(clear_all_item)
clear_all_item.addEventListener('click',function(){
    storage.clear();
    if(storage['addItemList'] == null){
        storage.setItem('addItemList','');
    }
    checkout_container.innerHTML = '';
    // 清空購物手推車的數字及陣列
    car_txt.innerHTML = 0;
    car_num = [];
    // console.log(car_num)
})

let load_storage_id = storage['addItemList']
let load_storage_arr = load_storage_id.substring(0,load_storage_id.length - 2).split(', ')
let car_num = load_storage_arr;

if(!storage['addItemList']){
    car_num = [];
    // console.log(car_num)
}

function load_storage(){
    if(storage['addItemList']){
        // console.log(load_storage_arr)
        car_txt.innerHTML = load_storage_arr.length
        for(let i = 0; i < load_storage_arr.length; i++){
            load_storage_info = storage.getItem(load_storage_arr[i]);
            // console.log(load_storage_arr[0])
            // console.log(storage.getItem(load_storage_arr[0]))
            show_checkout(load_storage_arr[i],load_storage_info)
        }
        // console.log('haha')
    }
}

load_storage();