<template>
<div class="abouy">
    <p @click="triggerTypeError()">触发TypeError</p>
    <el-divider></el-divider>
    <p @click="triggerReferenceError()">触发ReferenceError</p>
    <el-divider></el-divider>
    <p @click="triggerSyntaxError()">触发SyntaxError</p>
</div>
</template>

<script setup lang="ts">
const triggerTypeError=()=>{
    if(TypeError.length >0){
        console.log("err")
    }
}
const triggerReferenceError=()=>{
    throw new ReferenceError("hello")
}

const triggerSyntaxError=()=>{
    throw new SyntaxError("hello")

}


</script>

<style scoped>

</style>
