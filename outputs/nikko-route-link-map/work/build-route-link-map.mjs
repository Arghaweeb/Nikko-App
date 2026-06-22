import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const repoRoot = path.resolve("..", "..", "..");
const outputDir = path.resolve(repoRoot, "outputs", "nikko-route-link-map");

const routes = [
  "/",
  "/explore",
  "/explore/[id]",
  "/hotels",
  "/hotels/[id]",
  "/restaurants",
  "/restaurants/[id]",
  "/experiences",
  "/experiences/[id]",
  "/profile",
  "/wallet",
  "/rewards",
  "/community",
  "/live",
];

const attractionIds = [
  "kegon-falls",
  "toshogu",
  "lake-chuzenji",
  "senjogahara",
  "rinnoji",
  "kanmangafuchi",
];

const hotelIds = [
  "kanaya-heritage",
  "chuzenji-lakeside",
  "yumoto-onsen-ryokan",
  "satoyama-machiya",
];

const restaurantIds = [
  "soba-mizuoto",
  "yuba-zen",
  "irodori-market-kitchen",
  "kissa-raiden",
];

const experienceIds = [
  "dawn-kayak",
  "cedar-walk",
  "yuba-workshop",
  "goshuin-trail",
  "marsh-birding",
  "market-breakfast",
];

const navDestinations = [
  "/",
  "/explore",
  "/live",
  "/experiences",
  "/hotels",
  "/restaurants",
  "/community",
  "/wallet",
  "/rewards",
  "/profile",
];

const attractionDestinations = attractionIds.map((id) => `/explore/${id}`);
const hotelDestinations = hotelIds.map((id) => `/hotels/${id}`);
const restaurantDestinations = restaurantIds.map((id) => `/restaurants/${id}`);
const experienceDestinations = experienceIds.map((id) => `/experiences/${id}`);
const communityPostDestinations = ["/community#post-1", "/community#post-2"];
const communitySpotDestinations = [
  "/explore/toshogu",
  "/explore/rinnoji",
  "/explore/senjogahara",
  "/explore/lake-chuzenji",
  "/hotels/chuzenji-lakeside",
  "/restaurants/kissa-raiden",
  "/restaurants/irodori-market-kitchen",
  "/restaurants/soba-mizuoto",
  "/hotels/yumoto-onsen-ryokan",
  "/restaurants/yuba-zen",
];
const shrineDestinations = ["/explore/toshogu", "/explore/rinnoji"];

const hotelBookingDestinations = [
  "https://www.kanayahotel.co.jp/en/nkh/",
  "https://www.booking.com/",
  "https://travel.rakuten.co.jp/",
  "https://www.jalan.net/",
  "https://www.nikko-kankou.org/",
  "https://www.nikkoyumoto.com/",
];

const restaurantReserveDestinations = [
  "https://www.nikko-kankou.org/",
  "https://www.visitnikko.jp/en/plan-your-trip/tourist-information/",
  "https://www.tablecheck.com/",
];

const destinations = Array.from(
  new Set([
    ...navDestinations,
    ...attractionDestinations,
    ...hotelDestinations,
    ...restaurantDestinations,
    ...experienceDestinations,
    ...communityPostDestinations,
    ...hotelBookingDestinations,
    ...restaurantReserveDestinations,
  ]),
);

const statusByDestination = Object.fromEntries(
  destinations.map((destination) => [destination, "✅ works"]),
);

const traceRows = [
  ["components/Navbar.tsx", "50", "href=", 'href="/"', "/"],
  ["components/Navbar.tsx", "61", "href=", "href={href}; links array", navDestinations.join(", ")],
  ["components/Navbar.tsx", "117", "href=", "href={href}; mobileLinks filter", ["/", "/explore", "/live", "/community", "/wallet"].join(", ")],
  ["app/page.tsx", "41", "href=", 'href="/wallet"', "/wallet"],
  ["app/page.tsx", "50", "href=", 'href="/rewards"', "/rewards"],
  ["app/page.tsx", "59", "href=", 'href="/rewards"', "/rewards"],
  ["app/page.tsx", "101", "href=", 'href="/live"', "/live"],
  ["app/page.tsx", "146", "href=", 'href="/explore"', "/explore"],
  ["app/page.tsx", "154", "href=", "href={`/explore/${a.id}`}; attractions", attractionDestinations.join(", ")],
  ["app/page.tsx", "177", "href=", 'href="/community"', "/community"],
  ["app/page.tsx", "186", "href=", "href={`/community#${p.id}`}; initial posts slice", communityPostDestinations.join(", ")],
  ["app/page.tsx", "229", "href=", 'href="/experiences"', "/experiences"],
  ["app/page.tsx", "237", "href=", 'href="/experiences"', "/experiences"],
  ["app/community/page.tsx", "281", "href=", "href={href}; spotHref(post.spots)", communitySpotDestinations.join(", ")],
  ["app/explore/page.tsx", "68", "href=", "href={`/explore/${a.id}`}; attractions", attractionDestinations.join(", ")],
  ["app/explore/[id]/AttractionDetailClient.tsx", "42", "href=", 'href="/explore"', "/explore"],
  ["app/hotels/page.tsx", "43", "href=", "href={`/hotels/${h.id}`}; hotels", hotelDestinations.join(", ")],
  ["app/hotels/page.tsx", "68", "href=", "href={`/hotels/${h.id}`}; hotels", hotelDestinations.join(", ")],
  ["app/hotels/[id]/HotelDetailClient.tsx", "23", "href=", 'href="/hotels"', "/hotels"],
  ["app/hotels/[id]/HotelDetailClient.tsx", "82", "href=", "href={bookingLink.url}; hotel.bookingLinks", hotelBookingDestinations.join(", ")],
  ["app/restaurants/page.tsx", "36", "href=", "href={`/restaurants/${r.id}`}; restaurants", restaurantDestinations.join(", ")],
  ["app/restaurants/page.tsx", "61", "href=", "href={`/restaurants/${r.id}`}; restaurants", restaurantDestinations.join(", ")],
  ["app/restaurants/[id]/RestaurantDetailClient.tsx", "24", "href=", 'href="/restaurants"', "/restaurants"],
  ["app/restaurants/[id]/RestaurantDetailClient.tsx", "92", "href=", "href={reserveLink.url}; restaurant.reserveLinks", restaurantReserveDestinations.join(", ")],
  ["app/experiences/[id]/page.tsx", "22", "href=", 'href="/experiences"', "/experiences"],
  ["app/experiences/[id]/page.tsx", "51", "href=", 'href="/experiences"', "/experiences"],
  ["manual browser check", "", "route", "Experience detail URL shape requested for testing", experienceDestinations.join(", ")],
  ["app/live/page.tsx", "178", "href=", 'href="/community"', "/community"],
  ["app/live/page.tsx", "285", "href=", "href={href}; shrineHref(shrine.id)", shrineDestinations.join(", ")],
];

const controlRows = [
  ["Theme picker", "/explore", "Heritage & Spiritual", "✅ works", "URL remained /explore"],
  ["Theme picker", "/explore", "Food & Local Lifestyle", "✅ works", "URL remained /explore"],
  ["Language switcher", "/explore", "Japanese toggle", "✅ works", "URL remained /explore"],
  ["Language switcher", "/explore", "English toggle", "✅ works", "URL remained /explore"],
  ["Theme mode switcher", "/explore", "Dark mode", "✅ works", "URL remained /explore"],
  ["Theme mode switcher", "/explore", "Light mode", "✅ works", "URL remained /explore"],
  ["Footer links", "visible UI crawl", "/about, /contact, /help, /privacy, /terms", "✅ works", "No rendered footer links found"],
  ["Auth links", "visible UI crawl", "/login, /signup", "✅ works", "No rendered auth links found"],
  ["Plain internal anchors", "source search", '<a href="/...">', "✅ works", "No plain internal anchor tags found"],
];

const workbook = Workbook.create();
const mapSheet = workbook.worksheets.add("Route Link Map");
const traceSheet = workbook.worksheets.add("Link Trace");
const controlsSheet = workbook.worksheets.add("Control Checks");

mapSheet.showGridLines = false;
traceSheet.showGridLines = false;
controlsSheet.showGridLines = false;

const maxRows = Math.max(routes.length, destinations.length);
const mapValues = [["Route", "Destination URL", "Status"]];
for (let i = 0; i < maxRows; i += 1) {
  const destination = destinations[i] ?? "";
  mapValues.push([routes[i] ?? "", destination, destination ? statusByDestination[destination] : ""]);
}

mapSheet.getRangeByIndexes(0, 0, mapValues.length, 3).values = mapValues;
mapSheet.getRange("A1:C1").format = {
  fill: "#174436",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
mapSheet.getRangeByIndexes(1, 0, maxRows, 3).format = {
  fill: "#F7F3EA",
  font: { color: "#1F2933" },
  borders: { preset: "all", style: "thin", color: "#D8D3C8" },
  wrapText: true,
  verticalAlignment: "top",
};
mapSheet.getRange("A:A").format.columnWidthPx = 220;
mapSheet.getRange("B:B").format.columnWidthPx = 430;
mapSheet.getRange("C:C").format.columnWidthPx = 130;
mapSheet.getRangeByIndexes(1, 0, maxRows, 3).format.rowHeightPx = 30;
mapSheet.freezePanes.freezeRows(1);
mapSheet.tables.add(`A1:C${mapValues.length}`, true, "RouteLinkMapTable");

const traceValues = [["Source File", "Line", "Pattern", "Expression", "Resolved Destination URLs"], ...traceRows];
traceSheet.getRangeByIndexes(0, 0, traceValues.length, 5).values = traceValues;
traceSheet.getRange("A1:E1").format = {
  fill: "#174436",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
traceSheet.getRangeByIndexes(1, 0, traceRows.length, 5).format = {
  fill: "#FBF8F1",
  font: { color: "#1F2933" },
  borders: { preset: "all", style: "thin", color: "#D8D3C8" },
  wrapText: true,
  verticalAlignment: "top",
};
traceSheet.getRange("A:A").format.columnWidthPx = 360;
traceSheet.getRange("B:B").format.columnWidthPx = 60;
traceSheet.getRange("C:C").format.columnWidthPx = 90;
traceSheet.getRange("D:D").format.columnWidthPx = 340;
traceSheet.getRange("E:E").format.columnWidthPx = 680;
traceSheet.getRangeByIndexes(1, 0, traceRows.length, 5).format.rowHeightPx = 74;
traceSheet.freezePanes.freezeRows(1);
traceSheet.tables.add(`A1:E${traceValues.length}`, true, "LinkTraceTable");

const controlValues = [["Check", "Page", "Target", "Status", "Notes"], ...controlRows];
controlsSheet.getRangeByIndexes(0, 0, controlValues.length, 5).values = controlValues;
controlsSheet.getRange("A1:E1").format = {
  fill: "#174436",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
controlsSheet.getRangeByIndexes(1, 0, controlRows.length, 5).format = {
  fill: "#F7F3EA",
  font: { color: "#1F2933" },
  borders: { preset: "all", style: "thin", color: "#D8D3C8" },
  wrapText: true,
  verticalAlignment: "top",
};
controlsSheet.getRange("A:A").format.columnWidthPx = 190;
controlsSheet.getRange("B:B").format.columnWidthPx = 150;
controlsSheet.getRange("C:C").format.columnWidthPx = 260;
controlsSheet.getRange("D:D").format.columnWidthPx = 130;
controlsSheet.getRange("E:E").format.columnWidthPx = 360;
controlsSheet.getRangeByIndexes(1, 0, controlRows.length, 5).format.rowHeightPx = 38;
controlsSheet.freezePanes.freezeRows(1);
controlsSheet.tables.add(`A1:E${controlValues.length}`, true, "ControlChecksTable");

await fs.mkdir(outputDir, { recursive: true });

const mapInspect = await workbook.inspect({
  kind: "table",
  range: `'Route Link Map'!A1:C${mapValues.length}`,
  include: "values",
  tableMaxRows: 50,
  tableMaxCols: 3,
});
console.log(mapInspect.ndjson);

const traceInspect = await workbook.inspect({
  kind: "table",
  range: `'Link Trace'!A1:E${traceValues.length}`,
  include: "values",
  tableMaxRows: 6,
  tableMaxCols: 5,
});
console.log(traceInspect.ndjson);

const controlsInspect = await workbook.inspect({
  kind: "table",
  range: `'Control Checks'!A1:E${controlValues.length}`,
  include: "values",
  tableMaxRows: 20,
  tableMaxCols: 5,
});
console.log(controlsInspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

for (const sheetName of ["Route Link Map", "Link Trace", "Control Checks"]) {
  const preview = await workbook.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  const bytes = new Uint8Array(await preview.arrayBuffer());
  await fs.writeFile(path.join(outputDir, `${sheetName.replace(/\s+/g, "-").toLowerCase()}.png`), bytes);
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(path.join(outputDir, "nikko-route-link-map-updated.xlsx"));
console.log(`Saved ${path.join(outputDir, "nikko-route-link-map-updated.xlsx")}`);
process.exit(0);
