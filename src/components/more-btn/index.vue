<template>
    <div class="more-btn">
        <el-button type="primary" @click="more">More Products</el-button>
    </div>
</template>
<script setup>
    const emit = defineEmits(['getMore']);

    const more = () => {
        emit('getMore');
    };
</script>
<style lang="less" scoped>
    .more-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;

        :deep(.el-button) {
            width: 205px;
            border-radius: 15px;
            height: 40px;
        }
    }
</style>