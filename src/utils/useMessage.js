// useMessage.js
// import { ElMessage } from 'element-plus';

const useMessage = (options,duration = 8000) => {
    ElMessage({
        ...options,
        duration
    });
};

export default useMessage;
