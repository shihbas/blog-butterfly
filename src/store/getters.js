import {
    IsMobile
} from "@/utils/common";

const getters = {
    displayName: state => state.user.displayName,
    avatar: state => state.user.avatar,
    openId: state => state.user.openId,
    isLogin: state => state.user.isLogin,
    activeTag: state => state.page.activeTag,
    isMobile: state => {
        if (state.page.isMobile !== 'None') {
            return state.page.isMobile
        }
        state.page.isMobile = IsMobile()
        return state.page.isMobile
    }
}
export default getters
