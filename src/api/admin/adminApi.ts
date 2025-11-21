/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface EventCreateRequest {
  title?: string;
  content?: string;
  eventType?: "EVENT" | "NOTICE";
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

export interface EventResponse {
  /** @format int64 */
  id?: number;
  title?: string;
  content?: string;
  eventType?: "EVENT" | "NOTICE";
  authorNickname?: string;
  /** @format int32 */
  participantCount?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

export interface RespEventResponse {
  success?: boolean;
  data?: EventResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface WarnUserRequest {
  reason?: string;
}

export interface RespString {
  success?: boolean;
  data?: string;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface BlacklistRequest {
  reason?: string;
  /** @format date-time */
  endDate?: string;
}

export interface RespUserResponse {
  success?: boolean;
  data?: UserResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface UserResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface ReportProcessRequest {
  accepted?: boolean;
  adminMemo?: string;
}

export interface ReportResponse {
  /** @format int64 */
  id?: number;
  reporterNickname?: string;
  reportedUserNickname?: string;
  reportType?: "BOARD" | "COMMENT";
  /** @format int64 */
  contentId?: number;
  reason?: string;
  status?: "PENDING" | "ACCEPTED" | "REJECTED";
  /** @format date-time */
  createdAt?: string;
}

export interface RespReportResponse {
  success?: boolean;
  data?: ReportResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface RespListUserResponse {
  success?: boolean;
  data?: UserResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface ReservationResponse {
  /** @format int64 */
  reservationId?: number;
  boardTitle?: string;
  /** @format date */
  scheduleDate?: string;
  /** @format int32 */
  quantity?: number;
  totalPrice?: number;
  /** @format date-time */
  reservationDate?: string;
  reservationStatus?: "RESERVED" | "CANCELED";
  userNickname?: string;
}

export interface RespListReservationResponse {
  success?: boolean;
  data?: ReservationResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface RespListReportResponse {
  success?: boolean;
  data?: ReportResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface UnblacklistRequest {
  memo?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8080";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Happy-Friends
 * @version 1.0.0
 * @baseUrl http://localhost:8080
 *
 * Happy-Friends REST API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description 이벤트를 수정합니다.
     *
     * @tags 이벤트 & 공지사항
     * @name UpdateEvent
     * @summary 이벤트 수정
     * @request PUT:/api/admin/events/{eventId}
     * @secure
     */
    updateEvent: (eventId: number, data: EventCreateRequest, params: RequestParams = {}) =>
      this.request<RespEventResponse, any>({
        path: `/api/admin/events/${eventId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 경고를 부여하고 3회 누적 시 블랙리스트 처리
     *
     * @tags 사용자
     * @name GiveWarningToUser
     * @summary 사용자에게 경고 부여
     * @request POST:/api/admin/users/{userId}/warning
     * @secure
     */
    giveWarningToUser: (userId: number, data: WarnUserRequest, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/admin/users/${userId}/warning`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 특정 사용자를 블랙리스트로 지정하고 상태를 변경
     *
     * @tags 사용자
     * @name BlacklistUser
     * @summary 사용자 블랙리스트 등록
     * @request POST:/api/admin/users/{userId}/blacklist
     * @secure
     */
    blacklistUser: (userId: number, data: BlacklistRequest, params: RequestParams = {}) =>
      this.request<RespUserResponse, any>({
        path: `/api/admin/users/${userId}/blacklist`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 블랙리스트에 등록된 사용자를 다시 활성 상태로 변경
     *
     * @tags 사용자
     * @name UnblacklistUser
     * @summary 사용자 블랙리스트 해제
     * @request DELETE:/api/admin/users/{userId}/blacklist
     * @secure
     */
    unblacklistUser: (userId: number, data: UnblacklistRequest, params: RequestParams = {}) =>
      this.request<RespUserResponse, any>({
        path: `/api/admin/users/${userId}/blacklist`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 관리자가 새로운 공지사항을 생성합니다.
     *
     * @tags 이벤트 & 공지사항
     * @name CreateNotice
     * @summary 공지사항 생성
     * @request POST:/api/admin/notices
     * @secure
     */
    createNotice: (data: EventCreateRequest, params: RequestParams = {}) =>
      this.request<RespEventResponse, any>({
        path: `/api/admin/notices`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 관리자가 새로운 이벤트를 생성합니다.
     *
     * @tags 이벤트 & 공지사항
     * @name CreateEvent
     * @summary 이벤트 생성
     * @request POST:/api/admin/events
     * @secure
     */
    createEvent: (data: EventCreateRequest, params: RequestParams = {}) =>
      this.request<RespEventResponse, any>({
        path: `/api/admin/events`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 관리자가 신고를 승인 또는 반려 처리합니다.
     *
     * @tags 신고
     * @name ProcessReport
     * @summary 관리자 신고 처리
     * @request PATCH:/api/admin/reports/{reportId}
     * @secure
     */
    processReport: (reportId: number, data: ReportProcessRequest, params: RequestParams = {}) =>
      this.request<RespReportResponse, any>({
        path: `/api/admin/reports/${reportId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 회원들의 정보를 확인합니다.
     *
     * @tags 사용자
     * @name GetUsersInfo
     * @summary 유저들 정보 조회
     * @request GET:/api/admin/users
     * @secure
     */
    getUsersInfo: (params: RequestParams = {}) =>
      this.request<RespListUserResponse, any>({
        path: `/api/admin/users`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 관리자가 사용자의 정보를 확인합니다.
     *
     * @tags 사용자
     * @name GetUserInfo
     * @summary 다른 사용자 정보 조회
     * @request GET:/api/admin/users/{id}
     * @secure
     */
    getUserInfo: (id: number, params: RequestParams = {}) =>
      this.request<RespUserResponse, any>({
        path: `/api/admin/users/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 서비스 내의 모든 진행중인 예약 내역을 조회합니다.
     *
     * @tags 예약 관리
     * @name GetAllReservations
     * @summary 전체 예약 조회 (관리자용)
     * @request GET:/api/admin/reservations
     * @secure
     */
    getAllReservations: (params: RequestParams = {}) =>
      this.request<RespListReservationResponse, any>({
        path: `/api/admin/reservations`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 신고 내용 목록을 조회합니다.
     *
     * @tags 신고
     * @name GetReportList
     * @summary 신고 목록 조회
     * @request GET:/api/admin/reports
     * @secure
     */
    getReportList: (params: RequestParams = {}) =>
      this.request<RespListReportResponse, any>({
        path: `/api/admin/reports`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 신고 내용을 조회합니다.
     *
     * @tags 신고
     * @name GetReport
     * @summary 신고 내용 조회
     * @request GET:/api/admin/reports/{id}
     * @secure
     */
    getReport: (id: number, params: RequestParams = {}) =>
      this.request<RespReportResponse, any>({
        path: `/api/admin/reports/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 판매자나 관리자가 권한을 사용하여 사용자의 예약을 강제로 취소하고 알림을 보냅니다.
     *
     * @tags 예약 관리
     * @name ForceCancelReservation
     * @summary 예약 강제 취소 (관리자/판매자용)
     * @request DELETE:/api/admin/reservations/{reservationId}
     * @secure
     */
    forceCancelReservation: (reservationId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/admin/reservations/${reservationId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
