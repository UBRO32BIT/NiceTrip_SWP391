import { api } from '../api';

const GetRentalTransactionByReceiver = (receiver: string) => {
    return api.get(`/payment/rental-transaction?receiver=${receiver}`)
        .then((res) => {
            return res.data.data.results
        })
        .catch((error) => {

        })
}
const GetFinancialSummary = (userId: string) =>{
    return api.get(`/payment/summarize-financial/${userId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {

        })
}

const GetTransactionHistory = (userId: string) =>{
    return api.get(`/payment/transaction-history/${userId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {

        })
}

const PayoutThroughPayPal = (data: any) => {
    return api.post('/payment/payout', data)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {

        })
}

export {
    GetRentalTransactionByReceiver,
    GetFinancialSummary,
    GetTransactionHistory,
    PayoutThroughPayPal
}