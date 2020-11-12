import dotenv from 'dotenv';
dotenv.config();

import { KmsKeyringNode, buildClient, CommitmentPolicy } from "@aws-crypto/client-node";
const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);

const decryptItem = async (secret) => {
  const accountNumber = process.env["ACCOUNT_NUMBER"];
  const keyId = process.env["KEYID"];
  const generatorKeyId = `arn:aws:kms:us-east-1:${accountNumber}:key/${keyId}`;
  const keyring = new KmsKeyringNode({ generatorKeyId });
  const { plaintext } = await decrypt(keyring, secret);

  return Promise.resolve(plaintext);
}

export default decryptItem;