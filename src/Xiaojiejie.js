import React, { Component, Fragment } from 'react';
import axios from 'axios'
import './style.css'
import XiaojiejieItem from './XiaojiejieItem'
import Boss from './Boss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class Xiaojiejie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            list: ['基础按摩', '精油推背']
        };

        this.inputChange = this.inputChange.bind(this)
        this.addList = this.addList.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }
    componentWillMount() {
        console.log('componentWillMount----------组件将要挂载到页面的时刻')
    }

    componentDidMount() {
        console.log('componentDidMount----------组件已经挂载到页面的时刻')
        axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda')
            .then(res => {
                console.log('获取数据成功,', JSON.stringify(res))
            })
            .catch(error => {
                console.log('获取数据失败', error)
            })
    }

    shouldComponentUpdate() {
        console.log('1-shouldComponentUpdate')
        return true
    }

    componentWillUpdate() {
        console.log('2-componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('4-componentDidUpdate')
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    render() {
        console.log('3-render--------组件挂载中')
        return (
            <Fragment>
                <div>
                    <label htmlFor="jspang">增加服务:</label>
                    <input
                        id="jspang"
                        className="input"
                        value={this.state.inputVal}
                        onChange={this.inputChange}
                        ref={(input) => { this.input = input }}
                    />
                    <button onClick={this.addList}>增加服务</button>
                </div>
                <ul ref={(ul) => { this.ul = ul }}>
                    <TransitionGroup>
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <CSSTransition
                                        timeout={2000}
                                        classNames="boss-text"
                                        unmountOnExit
                                        appear={true}
                                        key={index+item}
                                    >
                                        <XiaojiejieItem
                                            content={item}
                                            key={index + item}
                                            index={index}
                                            list={this.state.list}
                                            deleteItem={this.deleteItem}
                                        />
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>
                </ul>

                <Boss />
            </Fragment>
        );
    }
    inputChange() {
        // console.log(e.target.value)
        this.setState({
            inputVal: this.input.value
        })
    }
    //添加列表
    addList() {
        this.setState({
            list: [...this.state.list, this.state.inputVal],
            inputVal: ''
        }, () => {
            console.log(this.ul.querySelectorAll('li').length)
        })

    }
    //删除列表
    deleteItem(index) {
        const { list } = this.state
        list.splice(index, 1)
        this.setState({
            list: list
        })
    }
}

export default Xiaojiejie;