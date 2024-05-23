
export const serviceUUID = "123e4567-e89b-12d3-a456-426614174000";
export const wifiUUID = "123e4567-e89b-12d3-a456-00805f9b34fb";
export const ailyUUID = "123e4567-e89b-12d3-a456-00805f9b3509";
export const ailyStatusUUID = "123e4567-e89b-12d3-a456-00805f9b350b";
export const ailyLogUUID = "123e4567-e89b-12d3-a456-00805f9b350a";
export const updateResUUID = "123e4567-e89b-12d3-a456-426614174011";

export const llmModelOptionsUUID = "123e4567-e89b-12d3-a456-00805f9b3500";
export const sttModelOptionsUUID = "123e4567-e89b-12d3-a456-00805f9b3503";
export const ttsModelOptionsUUID = "123e4567-e89b-12d3-a456-00805f9b3507";
export const ttsRoleOptionsUUID = "123e4567-e89b-12d3-a456-00805f9b3508";


export const ChrModelOptionsList = [
    { name: "llmModelOptions", uuid: llmModelOptionsUUID},
    { name: "sttModelOptions", uuid: sttModelOptionsUUID},
    { name: "ttsModelOptions", uuid: ttsModelOptionsUUID},
    // { name: "ttsRoleOptions", uuid: ttsRoleOptionsUUID },
]

export const ChrModelConfList = [
    { name: "llmURL", uuid: "123e4567-e89b-12d3-a456-00805f9b34fc"},
    { name: "llmModel", uuid: "123e4567-e89b-12d3-a456-426614174002" },
    { name: "llmKey", uuid: "123e4567-e89b-12d3-a456-00805f9b34fd" },
    { name: "llmPrePrompt", uuid: "123e4567-e89b-12d3-a456-00805f9b34fe" },
    { name: "llmTemp", uuid: "123e4567-e89b-12d3-a456-00805f9b34ff" },
    { name: "sttURL", uuid: "123e4567-e89b-12d3-a456-00805f9b350c"}
    { name: "sttModel", uuid: "123e4567-e89b-12d3-a456-00805f9b3501" },
    { name: "sttKey", uuid: "123e4567-e89b-12d3-a456-00805f9b3502" },
    { name: "ttsURL", uuid: "123e4567-e89b-12d3-a456-00805f9b350d"},
    { name: "ttsModel", uuid: "123e4567-e89b-12d3-a456-00805f9b3504" },
    { name: "ttsKey", uuid: "123e4567-e89b-12d3-a456-00805f9b3505" },
    { name: "ttsRole", uuid: "123e4567-e89b-12d3-a456-00805f9b3506" },
]

export const CharacteristicList = [
    {
        name: "Device ID",
        icon: "fa-light fa-microchip",
        unit: "",
        uuid: "123e4567-e89b-12d3-a456-426614174001"
    },
    {
        name: "Model",
        icon: "fa-light fa-layer-group",
        unit: "",
        uuid: "123e4567-e89b-12d3-a456-426614174002"
    },
    {
        name: "Network",
        icon: "fa-light fa-globe",
        unit: "",
        uuid: "123e4567-e89b-12d3-a456-426614174003",
    },
    {
        name: "IP",
        icon: "fa-light fa-network-wired",
        unit: "",
        uuid: "123e4567-e89b-12d3-a456-426614174004",
    },
    {
        name: "CPU Usage",
        icon: "fa-light fa-gauge",
        unit: "%",
        uuid: "123e4567-e89b-12d3-a456-426614174006"
    },
    {
        name: "CPU Tempture",
        icon: "fa-light fa-temperature-three-quarters",
        unit: "℃",
        uuid: "123e4567-e89b-12d3-a456-426614174005"
    },
    {
        name: "RAM Usage",
        icon: "fa-light fa-database",
        unit: "%",
        uuid: "123e4567-e89b-12d3-a456-426614174007"
    },
    {
        name: "Disk Usage",
        icon: "fa-light fa-server",
        unit: "%",
        uuid: "123e4567-e89b-12d3-a456-426614174008"
    },
    {
        name: "Battery",
        icon: "fa-light fa-battery-full",
        unit: "%",
        uuid: "123e4567-e89b-12d3-a456-426614174009"
    },
    {
        name: "Power",
        icon: "fa-light fa-bolt",
        unit: "",
        uuid: "123e4567-e89b-12d3-a456-426614174010"
    }
];


