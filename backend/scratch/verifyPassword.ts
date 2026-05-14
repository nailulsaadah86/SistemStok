import bcrypt from 'bcrypt';

async function testPassword() {
  const hash = '$2b$10$dQrGoQNTBgAeHh70IHiK.ORgGvReqhvE.e3sQ0raqhMA1ZDinqaBK';
  const match = await bcrypt.compare('admin', hash);
  console.log("Password 'admin' match:", match);
  
  const match2 = await bcrypt.compare('admin123', hash);
  console.log("Password 'admin123' match:", match2);
}

testPassword();
