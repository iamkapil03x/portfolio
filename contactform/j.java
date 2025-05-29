#include<stdio.h>
int* fun_arr(){
    static int arr[20];
    arr[0]=1;
    arr[1]=2;
    return arr1;
}
int main(){
    int* ptr1=fun_arr();
    printf("%d %d" , ptr1[0], ptr[1]);
    return 0;
}
