export const getSearchParams = () => {
  const search = window.location.search || "";
  const searchParamArray = search.substr(1).split("&");
  const searchParams = searchParamArray.reduce((paramsObj, param) => {
    if (param.length === 0) return paramsObj;

    const [paramName, paramValue] = param.split("=");
    paramsObj[paramName] = paramValue;
    return paramsObj;
  }, {});

  return searchParams;
};
