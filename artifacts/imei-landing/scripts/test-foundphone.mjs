import { chromium } from 'playwright';

const base = 'http://localhost:5173';

const browser = await chromium.launch();
const page = await browser.newPage({ locale: 'ar-SA' });

async function testInvalidToken() {
  await page.route('**/api/found/invalid-token', (route) => route.fulfill({ status: 404, body: 'Not Found' }));
  await page.goto(`${base}/found/invalid-token`, { waitUntil: 'networkidle' });
  await page.waitForSelector('text=رمز QR غير صالح');
  const title = await page.textContent('text=رمز QR غير صالح');
  const desc = await page.textContent('text=تعذر العثور على بيانات هذا الهاتف.');
  console.log('invalid-token title:', title?.trim());
  console.log('invalid-token desc:', desc?.trim());
}

async function testSafeResponse() {
  await page.route('**/api/found/safe-token', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true, reported: false, message: 'هذا الهاتف غير مسجل به إخطار فقد حتى الآن.' }),
  }));
  await page.goto(`${base}/found/safe-token`, { waitUntil: 'networkidle' });
  await page.waitForSelector('text=هذا الهاتف غير مسجل به إخطار فقد حتى الآن');
  const shield = await page.isVisible('svg');
  const infoCard = await page.textContent('text=ماذا يعني هذا؟');
  const privacyCard = await page.textContent('text=لا نعرض أي بيانات شخصية لأن الهاتف غير مُبلغ عنه.');
  console.log('safe-response info card:', infoCard?.trim());
  console.log('safe-response privacy card:', privacyCard?.trim());
}

async function testReportedResponse() {
  await page.route('**/api/found/reported-token', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      success: true,
      reported: true,
      owner_name: 'علي محمد',
      phone: '+966501234567',
      whatsapp_enabled: true,
      whatsapp_number: '+966501234567',
      code: '123456789012345',
    }),
  }));
  await page.goto(`${base}/found/reported-token`, { waitUntil: 'networkidle' });
  await page.waitForSelector('text=هذا الهاتف مُبلغ عنه');
  const phoneText = await page.textContent('text=+966501234567');
  const codeText = await page.textContent('text=123456789012345');
  const whatsappHref = await page.getAttribute('a:has-text("واتساب")', 'href');
  const callHref = await page.getAttribute('a:has-text("اتصل الآن")', 'href');
  console.log('reported phone:', phoneText?.trim());
  console.log('reported code:', codeText?.trim());
  console.log('whatsapp href:', whatsappHref);
  console.log('call href:', callHref);
}

async function testLoadingState() {
  let spinnerVisible = false;
  await page.route('**/api/found/loading-token', async (route) => {
    spinnerVisible = await page.isVisible('.animate-spin');
    await new Promise((resolve) => setTimeout(resolve, 500));
    await route.fulfill({ status: 404, body: 'Not Found' });
  });
  await page.goto(`${base}/found/loading-token`, { waitUntil: 'domcontentloaded' });
  spinnerVisible = await page.isVisible('.animate-spin');
  console.log('loading spinner visible:', spinnerVisible);
}

async function testRtlAndResponsive() {
  await page.route('**/api/found/responsive-token', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true, reported: false, message: 'هذا الهاتف غير مسجل به إخطار فقد حتى الآن.' }),
  }));
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${base}/found/responsive-token`, { waitUntil: 'networkidle' });
  const dir = await page.evaluate(() => document.documentElement.dir);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 10);
  console.log('rtl dir:', dir);
  console.log('mobile overflow:', overflow);
}

try {
  await testLoadingState();
  await testInvalidToken();
  await testSafeResponse();
  await testReportedResponse();
  await testRtlAndResponsive();
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await browser.close();
}
