export interface User {
  id: string; 
  username: string | null; 
  pfp_url: string | null; 
  addresses: Address[]; 
  fid?: number; 
}


export interface Address {
  protocol: string; // Protocolo do endereço, por exemplo, "HTTP", "HTTPS"
  address: string; // O endereço em si
  fid?: number; // Chave estrangeira, se aplicável, para vincular ao User
}
