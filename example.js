// Diff between foreach, map, filter, reduce
// [1, 2, 3] => [1, 4, 9]


let arr = [1, 2, 3];

arr.forEach(function (el){
  el = el*el;
});

arr.map((el) =>
{
  return el*el;
});

x = 2;
var x;

showModel()
{
//display model
}

component A(props) => {
  if(props.var === true)
  {
    showModel();
  }
};

component B(props) => {
  setProps(props.var = true);
};

component C() => {
  <button onClick={showModel}>Model</button>
};



[1, 2, 3 ,4, 5, 6, 7, 8 ,9, 10] , K = 8


int _binarySearch(vector<int> arr, int k)
{
  if (arr.size() == 0)
  return -1;

  int left = 0, right = arr.size() -1;

  while(left<right){

    int mid = (left + right)/2;

    if(arr[mid] == k ) return mid;
    else if(arr[mid] > k) right = mid-1;
    else left = mid + 1;
  }

  return -1;

}
