
/**
 * 计算列表中进入视图行的索引
 */


let preScrollTop = 0;
let preBottomRow; // 首次渲染最下面的可见行
let listContainerHeight;
let rowHeight = 83;

export const calcIndex = (scrollTop) => {
    
    if(scrollTop === undefined) {
        listContainerHeight = document.body.clientHeight 
                            - document.getElementById('listContainter').offsetTop 
                            - document.getElementById('head').offsetHeight
        preBottomRow = Math.ceil(listContainerHeight/rowHeight)
        return preBottomRow -1
    }

    
    if (preScrollTop < scrollTop) { // 列表向上滚动
        
        const currentBottomRow = Math.ceil((listContainerHeight + scrollTop)/rowHeight)
        const index = currentBottomRow > preBottomRow ? currentBottomRow : false
        preBottomRow = currentBottomRow
        preScrollTop = scrollTop
        return index -1
    } else { // 列表向下 不做处理
        preScrollTop = scrollTop;
        return false
    }
    
}