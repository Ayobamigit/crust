const baseUrl = () => {
    return 'https://7fe3-41-58-252-39.eu.ngrok.io'  
}


//Sign in
export const signIn = `${baseUrl()}/login`;

//Roles
export const roles = `${baseUrl()}/api/v1/roles/view`;

//Schemes
export const viewSchemes = `${baseUrl()}/api/v1/scheme/view`;
export const deleteScheme = `${baseUrl()}/api/v1/scheme/delete`;

// Stations
export const viewStations = `${baseUrl()}/api/v1/stations/view`;

// Routes
export const viewRoutes = `${baseUrl()}/api/v1/routes/view`;

// //Wallet 

// export const createWallet = `${baseUrl().wallet}/wallet/create-wallet`;

// export const walletDefault = `${baseUrl().agency}/agent/getMerchantBalance`;


// //business types 
// export const businessTypesList = `${baseUrl().auth}/business/type/find/all`;


// //Terminal Services
// export const requestTerminal = `${baseUrl().terminal}/terminals/request`;

// export const allTerminals = `${baseUrl().terminal}/terminals/viewallterminalbyuser`;

// export const allterminalTypes = `${baseUrl().terminal}/terminals/getterminaltypes`;

// export const terminalStats = `${baseUrl().terminal}/terminals`;




// //Merchant Services
// export const allMerchants = `${baseUrl().merchant}/agent/viewallmerchants`;

// export const getunassignedterminals = `${baseUrl().merchant}/agent/getunassignedterminals`;

// export const registerMerchant = `${baseUrl().merchant}/agent/registermerchant`;

// export const updateMerchant = `${baseUrl().merchant}/agent/updatemerchant`;

// export const updateMerchantID = `${baseUrl().agency}/agent/updateMerchantUserID`;

// export const mapTerminal = `${baseUrl().merchant}/agent/assignterminal`;

// export const unMapTerminal = `${baseUrl().merchant}/agent/unassignterminal`;

// export const viewMerchant = `${baseUrl().merchant}/agent/viewmerchantbyid`;

// export const viewMerchantTerminals = `${baseUrl().merchant}/agent/getmerchantterminals`;

// export const activateMerchant = `${baseUrl().merchant}/agent/activatemerchant`;

// export const deactivateMerchant = `${baseUrl().merchant}/agent/deactivatemerchant`;


// //Transaction Services

// export const allTransactions = `${baseUrl().transactions}/transactions/viewalltransactionsbyuser`;

// export const viewTransaction = `${baseUrl().transactions}/transactions/viewonetransactionsbyuser`;

// export const transactionStats = `${baseUrl().transactions}/transactions/transactioncount`;

// export const revenueStats = `${baseUrl().dispute}/api/v1/settlement/getTransactionStats`;


// //Activity Logs
// export const viewActivity = `${baseUrl().audit}/auditlogs/viewalliserlogs`;

// //Dispute service
// export const allWayaDisputes = `${baseUrl().dispute}/wayaposDisputes/viewAllDisputes`;

// export const allAuthDisputes = `${baseUrl().dispute}/auth-notification-dispute/viewAllDisputes`;

// export const createAuthDisputes = `${baseUrl().dispute}/auth-notification-dispute/createDispute`;

// export const allOtherDisputes = `${baseUrl().dispute}/othersDispute/viewAllDisputes`;

// export const createOtherDispute = `${baseUrl().dispute}/othersDispute/createDispute`;

// //Settlement
// export const allSettlement = `${baseUrl().dispute}/api/v1/settlement/viewusersettlement`;

// export const getSettlementDetails = `${baseUrl().dispute}/api/v1/settlement/viewusersettlementbyid`;

// export const settlementStats = `${baseUrl().dispute}/api/v1/settlement/getSettlementStats`;



