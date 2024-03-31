export interface User {
  id: string; 
  username: string | null; 
  pfp_url: string | null; 
  addresses: [Address]; 
  fid?: number; 
}


export interface Address {
  protocol: string; 
  address: string; 
  fid?: number; 
}

export interface  Fname {
    fid: number; 
    fname: String
    name: String
}

