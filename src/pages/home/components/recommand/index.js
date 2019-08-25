import React, { useEffect }from 'react'
import { connect } from 'dva';
import { viodShake, changeLoadingState} from '../../../../utils/common'
import styles from './index.less'

function Recommand (props) {
    const { 
      dispatch,
      applist: {
        recommandList,
        searchRecommandList
      },
      search: {
        keyword,
        mode
      },
      loading: {
        fetchRecommandList = true,
        fetchCheckRecommandList = false
      }
    } = props

    const loading = fetchRecommandList || fetchCheckRecommandList
    
    // 首次渲染完成 请求推荐列表
    useEffect(() => {
      dispatch({ 
        type: 'applist/fetchRecommandList', 
      })
    }, []);

    // 搜索模式下请求与关键字匹配的推荐列表
    useEffect(() => {
      if (mode === 'search') {
        // 启动loading
        changeLoadingState(dispatch, 'fetchCheckRecommandList', true)
        viodShake(() => {
          dispatch({ 
            type: 'applist/fetchCheckRecommandList', 
            payload: {
              keyword
            }
          });
        }, 500, 'recommand')
        
      }
    }, [dispatch, keyword, mode]);

    

    const list = mode === 'recommand' ? recommandList : searchRecommandList

    let listDom = 'loading'

    if(list.length > 0) {
      listDom = list.map(item => {
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
          id: {
            attributes: {
              "im:id": id,
            }
          }
        }  = item
  
        const {
          label: imgSrc
        } = imageList[1]
  
        return <li key={id} className={styles['list-item']}>
          <img src={imgSrc} alt="" />
          <p className={styles['ellipsis-two']}>{name}</p>
          <span>{category}</span>
        </li>
      })
    } else if(!loading){
      listDom = <div>暂无匹配</div>
    }

    return (<div className={styles.container} id="head">
        <p>推介</p>
        <div className={styles.scroll}>
          <ul className={styles.list}>
            {listDom}
          </ul>
        </div>
      </div>);
}
  
export default connect(({ applist, search, loadingState }) => ({
  applist,
  search,
  loading: loadingState.loading,
}))(Recommand);


