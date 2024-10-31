import axios from "axios";

const PINATA_AIP_KEY = process.env.NEXT_PUBLIC_PINATA_AIP_KEY;
const PINATA_SECRECT_KEY = process.env.NEXT_PUBLIC_PINATA_SECRECT_KEY;

export async function uploadPicture(file: File) {
  const formData = new FormData()

  formData.append('file', file)
  
  const response = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: formData,
    headers: {
      pinata_api_key: PINATA_AIP_KEY,
      pinata_secret_api_key: PINATA_SECRECT_KEY,
      "Content-Type": "multipart/form-data",
    },
  });
  
  const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

  return ImgHash
}
