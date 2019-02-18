const page = {
    state: {
        activeTag: 'homepage',
        isMobile: 'None'
    },
    mutations: {
        SET_ACTIVE_TAG: (state, tag) => {
            state.activeTag = tag
        },
        SET_IS_MOBILE: (state, isMobile) => {
            state.isMobile = isMobile
        }
    }
}

export default page
