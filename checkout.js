let storage = localStorage;

let load_storage_id = storage['addItemList']
let load_storage_arr = load_storage_id.substring(0,load_storage_id.length - 2).split(', ')
let checkout_container = document.querySelector('.checkout_container')
let total = 0;
let total_price = document.querySelector('.total span');

function load_storage(){
    if(storage['addItemList']){
        for(let i = 0; i < load_storage_arr.length; i++){
            load_storage_info = storage.getItem(load_storage_arr[i]);
            // console.log(load_storage_arr[i])
            // console.log(load_storage_info.split('|')[2])
            show_checkout(load_storage_arr[i],load_storage_info)
            total += parseInt(load_storage_info.split('|')[2]);
        }
    }
    total_price.innerHTML = total;
    // console.log(total)
}


load_storage();


// console.log(checkout_container)

function show_checkout(storageid,storagevalue){
    let new_li = document.createElement('li');
    new_li.classList.add('checkout_list');
    new_li.classList.add(`${storageid}`)
    checkout_container.append(new_li);
    let new_div = document.createElement('div');
    new_div.className = 'detail';
    new_li.append(new_div);
    let new_img = `<img src=${storagevalue.split('|')[1]} class="item_img">`
    // console.log(new_img)
    new_div.insertAdjacentHTML("beforebegin", new_img);
    let all_detail =
        `<p class="model">型號：` + storagevalue.split('|')[0] + `</p>
        <p class="price">價格：<span>` + storagevalue.split('|')[2] + `</span></p>
        <div class="item_number">
            <img src="./images/reduce.png" class="reduce">
            <p class="number">1</p>
            <img src="./images/add.png" class="add">
        </div>
        `;
    new_div.insertAdjacentHTML("beforeend", all_detail);
    let choice_clear = `<img src="./images/clear.png" class="clear">`;
    new_div.insertAdjacentHTML("afterend", choice_clear);

    //點擊商品數量數字增加&減少
    let count = 1;
    let add = document.querySelector(`.${storageid} .add`);
    let num = document.querySelector(`.${storageid} .number`)
    let item_price = document.querySelector(`.${storageid} .price span`);
    let reduce = document.querySelector(`.${storageid} .reduce`);
    let item_clear = document.querySelector(`.${storageid} .clear`);
    // console.log(item_price_span);
    // console.log(itemvalue.split('|')[2])
    add.addEventListener('click',function(){
        num.innerHTML = ++count;
        item_price.innerHTML = storagevalue.split('|')[2] * num.innerHTML;
        add_price(storagevalue.split('|')[2])
    })
    reduce.addEventListener('click',function(){
        num.innerHTML = --count;
        item_price.innerHTML = storagevalue.split('|')[2] * num.innerHTML;
        reduce_price(storagevalue.split('|')[2])
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
            }
        }
    })
    item_clear.addEventListener('click',function(){
        if(confirm("確認要刪除嗎？")){
            new_li.remove();
            storage.removeItem(`${storageid}`);
            storage['addItemList'] = storage['addItemList'].replace(`${storageid}, `,``);   
            
        }
        let all = 0;
        let all_price = document.querySelectorAll('.price span');
        for(let i = 0; i < all_price.length; i++){
            console.log(all_price[i].innerHTML);
            all = all + all_price[i].innerHTML;
        }
        total_price.innerHTML = all;
        // total += parseInt(load_storage_info.split('|')[2]);
    })

    function add_price(num){
        // console.log(num)
        total_price.innerHTML = parseInt(total_price.innerHTML) + parseInt(num)
    }

    function reduce_price(num){
        total_price.innerHTML = parseInt(total_price.innerHTML) - parseInt(num)
    }
    // add_reduce_price()

}

let check = document.querySelector('.check')
let checked = false;
let go = document.querySelector('.go')
let go_txt = document.querySelector('.go_txt')
check.addEventListener('click',function(){
    checked = !checked
    // console.log(checked)
    go.style.display = checked ? 'block' : 'none';
    go_txt.style.display = checked ? 'none' : 'block';
})
