/*
 * @Date: 2021-09-23 22:42:38
 * @Descripton: 状态提升（将子组件的状态交给父组件管理） 
 * 子组件怎么改变父组件传过来的props
 * @LastEditTime: 2021-10-07 23:43:25
 */
import React, {
  useEffect, useState
} from 'react';

const fetchData = () => {
  fetch("http://iwenwiki.com/wapicovid19/ncov.php?key=62e34ad34025d5d5127135efa58d4ca8")
    .then(res => console.log({ res: res.json() }))
    .catch(err => console.error({ err }))
}

export default (props) => {
  console.log('children2===>', props);
  let [money, setMoney] = useState(0)
  useEffect(() => {
    setMoney(props.money * 7)
    console.log('children2===>useEffect', props);
    fetchData()
  })
  return (
    <div>
      $: &nbsp;{money}
    </div>
  )
}

/* export default class Children2 extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    money: this.props.money * 7
  }
  componentWillMount() {
    this.money = this.props.money * 7
  }
  componentDidMount() {
    console.log('componentDidMount======>', this.props.money);
    this.money = this.props.money * 7
  }
  componentDidUpdate() {
    console.log('componentDidUpdate======>', this.props.money);
    +this.props.money * 7
    this.money = this.props.money * 7
  }
  render() {
    return (
      <div>
        $: &nbsp;  {this.props.money * 7}
      </div>
    )
  }
} */