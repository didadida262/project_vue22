 function ListNode(x){
  this.val = x;
   this.next = null;
 }
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param head ListNode类 
 * @return ListNode类
 */
function ReverseList( head ) {
    // write code here
    let res = null
    while (head) {
        const current = head
        const next = head.next
        current.next = null
        current.next = res
        res = current
        head = next
    }
    return res
}

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
const res = ReverseList(head)
console.log('res>>2', res)
