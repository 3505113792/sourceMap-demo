<template>
    <div class="pre-code">
        <div class="error-detail">
            <pre class="error-code" v-html="preLine()"></pre>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue'

// 定义 props
const props = defineProps<{
    origin?: {
        line?: number
        source?: string
        column?: number
    }
}>()

// 预处理代码行
const preLine = () => {
    // 检查数据是否存在
    if (!props.origin?.source || props.origin.line === undefined) {
        return '<div class="no-data">暂无源码信息</div>'
    }

    try {
        const line = props.origin.line
        const originCodeLine = props.origin.source.split('\n')
        const len = originCodeLine.length - 1
        
        // 计算显示范围（当前行前后各3行）
        const start = line - 3 >= 0 ? line - 3 : 0
        const end = start + 5 >= len ? len : start + 5
        
        const newLines: string[] = []
        
        for (let i = start; i <= end; i++) {
            const lineNumber = i + 1
            const content = lineNumber + '. ' + encodeHTML(originCodeLine[i] || '')
            const isHighlight = lineNumber === line
            
            newLines.push(
                `<div class="code-line ${isHighlight ? 'highlight' : ''}">${content}</div>`
            )
        }
        
        return newLines.join('')
        
    } catch (error) {
        console.error('格式化代码失败:', error)
        return '<div class="error">源码格式化失败</div>'
    }
}

// HTML 转义函数
const encodeHTML = (str: string): string => {
    if (!str || str.length === 0) return ''
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// 如果需要暴露方法给父组件
defineExpose({
    preLine
})
</script>

<!-- <script setup lang="ts">
export default{
    name:'PreView',
    props:{
        origin:Object
    },
    methods:{
        preLine(){
            const line=this.origin.line
            const originCodeLine=this.origin.source.split('\n')
            const len=originCodeLine.length-1;
            const start=line -3  >=0 ? line-3 : 0
            const end=start+5 >= len ? len : start+5
            let newLines=[]
            for(let i=start;i<=end;i++){
                const content=i+1+'. '+this.encodeHTML(originCodeLine[i])
                newLines.push(
                    `<div class="code-line ${i+1 === line ? 'heighlight' : ''}">${content}</div>`
                )
            }
            return newLines.join('')
        },
        encodeHTML(str){
            if(!str || str.length==0) return ''
            return str.replace(/&/g,'&amp;')
                      .replace(/</g,'&lt;')
                      .replace(/>/g,'&gt;')
                      .replace(/"/g,'&quot;')
                      .replace(/'/g,'&#39;')
        }
    }
}
</script> -->

<style scoped> 
.pre-code{
    .error-detail{
        padding:10px;
        overflow:hidden;
        font-family:consolas,monospace;
        word-wrap:normal
    }
    .code-line{
        padding:4px;
    }
    .heighlight{
        color: #fff;
        background-color:red;
    }
}
</style>