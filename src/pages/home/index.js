import React, { useState, useEffect } from 'react';
import { Icon } from 'antd'
import { connect } from 'dva';
// import { Transition } from 'react-transition-group';
import style from './index.less'
import Search from './components/search/index'
import Recommand from './components/recommand/index'
import { ListView } from 'antd-mobile';
import { viodShake, changeLoadingState } from '../../utils/common'
// import { calcIndex } from '../../utils/calcIndex'
const HomePage = (props) => {

  const { 
    dispatch,
    applist: {
      topList,
      searchTopList,
      isAll
    },
    search: {
      keyword,
      mode,
    },
    loading: {
      fetchTopList = true,
      fetchCheckTopList = false
    }
  } = props 
  
  const loading = fetchTopList || fetchCheckTopList

  const [pageIndex, setPageIndex] = useState(1)
  // const [inviewIndex, setInviewIndex] = useState(0)

  // 请求关键字搜索列表
  useEffect(()=>{
    if(mode === 'search') {
      changeLoadingState(dispatch, 'fetchCheckTopList', true)
      viodShake(() => {
        dispatch({
          type: 'applist/fetchCheckTopList',
          payload:{
            keyword
          }
        })
      }, 500, 'top')
    } 
  }, [pageIndex, keyword, mode, dispatch])

  // 请求前 10*pageIndex app列表
  const changePageIndex = from => {
    if(isAll || mode !== 'recommand') return

    const _pageIndex = from === 'reachBottom' ? pageIndex + 1 : pageIndex
    dispatch({
      type: 'applist/fetchTopList',
      payload:{
        LoadingTips: false,
        data: {
          pageIndex: _pageIndex
        }
      }
    })
    if(from === 'reachBottom') setPageIndex(pageIndex + 1)
    
  }

  useEffect(changePageIndex, [])

  const list = mode === 'search' ? searchTopList : topList

  // 定义Liistview 数据源
  const instance = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  })
  const dataBlob = {};
  list.forEach((item, i) => {
    dataBlob[`${i}`] = `row-${i}`
  })
  const dataSource = instance.cloneWithRows(dataBlob)
  
  const row = (rowData, sectionID, rowID) => {
    rowID = parseInt(rowID, 10)
    const item = list[rowID];
    const {
      "im:name": {
        label: name
      },
      category: {
        attributes: {
          label: category
        }
      },
      "im:image": imageList,
    }  = item

    const {
      label: imgSrc
    } = imageList[0]

    // 未找到 星级和评论相关数据 随机生成
    const star = Math.ceil(Math.random()/2*10)
    const comments = Math.ceil(Math.random()*100)
    
    const starList = new Array(5).fill(null).map((item, index)=>{
      
      let theme= index <= star ? "filled" : 'outlined'
      return <Icon type="star" theme={theme} style={{color: '#ff5b05'}} key={index}/>
    })
    
    // const isShow = rowID <= inviewIndex
    // return isShow ? <Transition timeout={500} key={rowID} in={false}>
    //     {state => { 
    //       console.log(state, '为什么总是只有一个exited')
    //       return <div className={style['list-item']} >
    //           <div className={style.index}>{rowID + 1}</div>
    //           <img src={imgSrc} alt="" className={rowID%2===0 ?  style.round: style.circle}/>
    //           <div className={style.info}>
    //             <p>{name}</p>
    //             <span>{category}</span>
    //             <div className={style.star}>
    //               <p>{starList}</p>
    //               <span>{`(${comments})`}</span>
    //             </div>
    //           </div>
    //       </div>
    //     }
    //   }
    //   </Transition> : <div style={{height: '83px'}} key={rowID}></div>
    return (<div className={style['list-item']} key={rowID}>
          <div className={style.index}>{rowID + 1}</div>
          <img src={imgSrc} alt="" className={rowID%2===0 ? style.round : style.circle}/>
          <div className={style.info}>
            <p>{name}</p>
            <span>{category}</span>
            <div className={style.star}>
              <p>{starList}</p>
              <span>{`(${comments})`}</span>
            </div>
          </div>
      </div>)
  }

  const separator = (sectionID, rowID) => {
    if(rowID + 1 === list.length) return null
    return <div
      key={rowID}
      className={style.border}
    />
  }

  // useEffect(() => {
  //   setInviewIndex(calcIndex())
  // }, [])

  return <div className={style.layout}>
    <div>
      <Search />
    </div>
    <div id="listContainter">
      <ListView
        className={style['am-list']}
        dataSource={dataSource}
        renderFooter={() => {
          
          const tips = loading ? 'loading' : 
             list.length === 0 ? '暂无匹配' :
            (mode === 'recommand' && isAll) || (mode === 'search') ? '到底啦' :'loaded'

          return <div style={{ padding: 10, textAlign: 'center' }}>{tips}</div>
        
        }}
        renderRow={row}
        renderHeader={() => <Recommand />}
        renderSeparator={separator}
        pageSize={10}
        onEndReached={() => changePageIndex('reachBottom')}
        onEndReachedThreshold={10}
        scrollEventThrottle = {20} // 20帧调用一次onScroll 
        // onScroll={e => {
        //   const index = calcIndex(e.target.scrollTop)
        //   if( index > 0 ) {
        //     setInviewIndex(index)
        //   }
        // }}
      />
    </div>
  </div>
}


export default connect(({ applist, search, loadingState }) => ({
  applist,
  search,
  loading: loadingState.loading
}))(HomePage);

