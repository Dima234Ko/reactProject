import { getTaskId, checkTask } from "./task";
import { setProgress } from "../store/actions/progressActions";

export async function setWiFi(
  serial,
  ssid2_4,
  password2_4,
  selectSSID2_4,
  ssid5,
  password5,
  selectSSID5,
  setLoading,
  setResult,
  dispatch,
  navigate,
  regionId
) {
  setLoading(true);
  setResult(null);
  dispatch(setProgress(0));
  let body = {
    regionId: regionId,
    serialNewNtu: serial,
    ssidWifi2: ssid2_4,
    passWifi2: password2_4,
    channelWifi2: selectSSID2_4,
    ssidWifi5: ssid5,
    passWifi5: password5,
    channelWifi5: selectSSID5,
  };

  try {
    // Получаем taskId
    const taskId = await getTaskId(
      "setNTU/setNtuWifi",
      body,
      dispatch,
      setLoading,
      navigate,
      serial
    );
    if (taskId) {
      // Если taskId получен, начинаем отслеживание статуса
      await checkTask(
        "setNTU/taskStatus",
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        80,
      );
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}
