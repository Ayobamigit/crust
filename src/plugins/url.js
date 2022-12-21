const baseUrl = () => {
    // return 'https://a0ab-41-58-251-76.eu.ngrok.io'  
    return 'http://ec2-35-176-152-15.eu-west-2.compute.amazonaws.com:2028'  
}


//Auth
export const signIn = `${baseUrl()}/login`;
export const updatePassword = `${baseUrl()}/api/v1/users/updatePassword`;
export const forgotPassword = `${baseUrl()}/api/v1/users/forgotPassword`;

//Dashboard
export const dashboardData = `${baseUrl()}/api/v1/dashboard/data`;

//Roles
export const roles = `${baseUrl()}/api/v1/roles/view`;

//Transactions
export const viewTransactions = `${baseUrl()}/api/v1/transaction/view`;
export const viewTransactionsParam = `${baseUrl()}/api/v1/transaction/viewallbyparam`;
// 
//Schemes
export const viewSchemes = `${baseUrl()}/api/v1/scheme/view`;
export const createScheme = `${baseUrl()}/api/v1/scheme/create`;
export const updateScheme = `${baseUrl()}/api/v1/scheme/update`;
export const deleteScheme = `${baseUrl()}/api/v1/scheme/delete`;

// Stations
export const viewStations = `${baseUrl()}/api/v1/stations/view`;
export const createStation = `${baseUrl()}/api/v1/stations/create`;
export const updateStation = `${baseUrl()}/api/v1/stations/update`;
export const deleteStation = `${baseUrl()}/api/v1/stations/delete`;

// Routes
export const viewRoutes = `${baseUrl()}/api/v1/routes/view`;
export const createRoute = `${baseUrl()}/api/v1/routes/create`;
export const deleteRoute = `${baseUrl()}/api/v1/routes/delete`;

// Users 
export const createUser = `${baseUrl()}/api/v1/users/create`;
export const viewUsers = `${baseUrl()}/api/v1/users/view`;
export const updateUser = `${baseUrl()}/api/v1/users/update`;
export const deleteUser = `${baseUrl()}/api/v1/users/delete`;


// Clients
export const createClient = `${baseUrl()}/api/v1/clients/create`;
export const viewClients = `${baseUrl()}/api/v1/clients/view`;
export const updateClient = `${baseUrl()}/api/v1/clients/update`;
export const deleteClient = `${baseUrl()}/api/v1/clients/delete`;
export const viewClientsParam = `${baseUrl()}/api/v1/clients/search`;

//Terminal
export const createTerminal = `${baseUrl()}/api/v1/terminals/create`;
export const viewTerminals = `${baseUrl()}/api/v1/terminals/view`;
export const updateTerminal = `${baseUrl()}/api/v1/terminals/update`;
export const deleteTerminal = `${baseUrl()}/api/v1/terminals/delete`;
export const viewTerminalsParam = `${baseUrl()}/api/v1/terminals/view/byParam`;
export const remapTerminal = `${baseUrl()}/api/v1/terminals/view/remap`;




//Merchant
export const createMerchant = `${baseUrl()}/api/v1/merchants/create`;
export const viewMerchants = `${baseUrl()}/api/v1/merchants/view`;
export const updateMerchant = `${baseUrl()}/api/v1/merchants/update`;
export const deleteMerchant = `${baseUrl()}/api/v1/merchants/delete`;
export const viewMerchantsParam = `${baseUrl()}/api/v1/merchants/view/byparam`;

