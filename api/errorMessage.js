export const errorMessage = (status = 500, message, err) => {
    const error = new Error();
    error.status = typeof status === "number" ? status : 500;
    error.message = `${message} - 錯誤詳細描述: ${err ? String(err) : "條件錯誤"}`;
    return error;
};
