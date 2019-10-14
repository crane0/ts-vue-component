import Vue from 'vue'
// 将组件声明为一个类，继承vue
declare class EmployeeQuery extends Vue {
  name: string
  selected: number
  department: {
    departmentId: number
    department: string
  }[]
  query(): void
}

// 因为编写的是 umd 模块，必须要加这条语句
export as namespace EmployeeQuery

export = EmployeeQuery