API基础URL
const BASE_URL = 'http://your-api-domain.com/api';

// API服务类
class APIService {
    // 获取帖子详情
    static async getPostDetail(postId) {
        try {
            const response = await fetch(`${BASE_URL}/posts/${postId}`);
            if (!response.ok) throw new Error('获取帖子失败');
            return await response.json();
        } catch (error) {
            console.error('获取帖子详情错误:', error);
            throw error;
        }
    }

    // 获取评论列表
    static async getComments(postId, page = 1) {
        try {
            const response = await fetch(`${BASE_URL}/posts/${postId}/comments?page=${page}`);
            if (!response.ok) throw new Error('获取评论失败');
            return await response.json();
        } catch (error) {
            console.error('获取评论列表错误:', error);
            throw error;
        }
    }

    // 发表评论
    static async createComment(postId, content) {
        try {
            const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}` // 从localStorage获取token
                },
                body: JSON.stringify({ content })
            });
            if (!response.ok) throw new Error('发表评论失败');
            return await response.json();
        } catch (error) {
            console.error('发表评论错误:', error);
            throw error;
        }
    }

    // 上传头像
    static async uploadAvatar(file) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`${BASE_URL}/users/avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: formData
            });
            if (!response.ok) throw new Error('上传头像失败');
            return await response.json();
        } catch (error) {
            console.error('上传头像错误:', error);
            throw error;
        }
    }

    // 获取token
    static getToken() {
        return localStorage.getItem('token');
    }
} 