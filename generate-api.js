import { generateApi } from 'swagger-typescript-api';
import path from 'path';
import dotenv from 'dotenv';

const isLocal = process.argv[2] === 'local';

const envFile = isLocal ? '.env.local' : '.env';

dotenv.config({ path: envFile });
const BASE_URL = process.env.PUBLIC_API_URL || 'http://localhost:8081';

console.log(`=============================================`);
console.log(`읽어온 설정 파일: ${envFile}`);
console.log(`서버 주소:   ${BASE_URL}`);
console.log(`=============================================`);

const generate = async (name, urlPath, outputDir) => {
  try {
    await generateApi({
      name: `${name}Api.ts`,                          // 파일 이름
      output: path.resolve(process.cwd(), outputDir), // 저장 경로
      url: `${BASE_URL}${urlPath}`,                   // 스웨거 주소
      httpClientType: 'fetch',                        
    });
    console.log(`✅ [${name}] API 생성 성공!`);
  } catch (e) {
    console.error(`❌ [${name}] API 생성 실패...`, e);
  }
};

(async () => {
  await generate('common', '/v3/api-docs/common-api', './src/api/common');
  await generate('admin',  '/v3/api-docs/admin-api',  './src/api/admin');
  await generate('user',   '/v3/api-docs/user-api',   './src/api/user');
})();