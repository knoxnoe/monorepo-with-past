const oneStep = {

    state: {
        buildingNumber: '',
        estateCode: '',
        unitMessage: []
    },
    mutations: {
        SET_TITLE(state, payload) {
            state.buildingNumber = payload.buildingNumber
            state.estateCode = payload.estateCode
        },
        SET_TITLE2(state, payload) {
            state.unitMessage = payload.unitMessage
        }
    },
    actions: {

    },
    getters: {

    }
}

export default oneStep
