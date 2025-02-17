import Overalldata from "@/app/_components/Widgets/Overalldata/Overalldata";
import WebsiteTraffic from "@/app/_components/Widgets/WebsiteTraffic/WebsiteTraffic";

export const availableWidgets = {
    "OVRL001": { name: "Overall", component: Overalldata, widgetId: "OVRL001" },
    "WEBT002": { name: "Web Traffic", component: WebsiteTraffic, widgetId: "WEBT002" }
}