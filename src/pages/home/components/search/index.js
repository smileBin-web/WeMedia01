import React, { useState, useEffect }from 'react'
import { SearchBar } from 'antd-mobile';
import { connect } from 'dva';
import style from './index.less'

function Search (props) {

    const [ keyword, setKeyword ] = useState('')
    const { dispatch } = props

    useEffect(() => {
        dispatch({ 
          type: 'search/changeKeyWord', 
          payload: keyword.trim()
        });
      
    }, [keyword.trim(), dispatch]);

    return (<div >
        <SearchBar 
          value={keyword}
          placeholder='搜索' 
          className={style['am-search']}
          onChange={setKeyword}
        />
      </div>);
}
  
export default connect(({ search }) => ({
  search,
}))(Search);


