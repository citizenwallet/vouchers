# Vouchers Generator

Generate a voucher as an NFT to express your gratitude

### Generate voucher image

/api/voucher.png?contract_address=0x1234&goodfor=free%20cargobike%20ride&from=Xavier&date=2023-06-24

### Upload to IPFS

/api/mint?contract_chain=polygon&contract_address=0x...&id={id}&minter_name=Xavier&minter_address=0x...&name=cargobike%20voucher&description=free%20cargobike%20ride&qrcode_content=https://...

returns

```json
{
  "contract_address": "0x9876544211",
  "token_id": "1",
  "metadata": {
    "uri": "ipfs://QmZ3wdUACfW71vdxC7ZTMVjQdoLcCZGjwcdExaxoYwiKjQ",
    "content": {
      "name": "cargobike",
      "description": "cargobike ride",
      "minter_name": "Xavier",
      "minter_address": "0x123456",
      "contract_chain": "matic",
      "contract_address": "0x9876544211",
      "minting_date": "2023-05-24",
      "image": "ipfs://QmYTwRW9wpbkuDRrL6RKtCcNSthUPf1gmEva2JzqSrZXEL"
    }
  }
}
```

Then in the smart contract, you just need to call the `setURI()` to the ipfs address provided (`response.metadata.uri`).

Content of `metadata.json`:

```json
{
  "name": "cargobike",
  "description": "cargobike ride",
  "minter_name": "Xavier",
  "minter_address": "0x123456",
  "contract_chain": "matic",
  "contract_address": "0x9876544211",
  "minting_date": "2023-05-24",
  "image": "ipfs://QmZ3wdUACfW71vdxC7ZTMVjQdoLcCZGjwcdExaxoYwiKjQ"
}
```
