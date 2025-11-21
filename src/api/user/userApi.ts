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

export interface UserUpdateRequest {
  /**
   * 이름
   * @minLength 1
   * @example "개발용 계정"
   */
  name: string;
  /**
   * 닉네임
   * @minLength 1
   * @example "dev"
   */
  nickname: string;
  /**
   * 전화번호
   * @minLength 1
   * @example "010-5380-0048"
   */
  phone: string;
  /**
   * 이메일
   * @minLength 1
   * @example "0414minyoung@naver.com"
   */
  email: string;
  /**
   * 주소
   * @minLength 1
   * @example "인천 남동구 백범로 124번길 43"
   */
  address: string;
  /**
   * 생년월일
   * @minLength 1
   * @example "2003-04-14"
   */
  birth: string;
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

export interface ScheduleUpdateRequest {
  /** @format date */
  scheduleDate?: string;
  /** @format int32 */
  maxHeadcount?: number;
  price?: number;
}

export interface RespString {
  success?: boolean;
  data?: string;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

/** 게시글 요청 */
export interface BoardRequest {
  /**
   * 게시글 제목
   * @example "제목입니다"
   */
  title?: string;
  /**
   * 게시글 내용
   * @example "내용입니다"
   */
  content?: string;
  /**
   * 게시글 유형
   * @example "EAT"
   */
  boardType?: "EAT" | "PLAY" | "STAY";
  /**
   * 주소
   * @example "서울 강남구 학동로 426"
   */
  address?: string;
}

export interface BoardFileResponse {
  /** @format int64 */
  id?: number;
  originalName?: string;
  filePath?: string;
  fileType?: "IMAGE" | "VIDEO";
  thumbnailPath?: string;
}

export interface BoardResponse {
  /** @format int64 */
  id?: number;
  title?: string;
  content?: string;
  /** @format int64 */
  view?: number;
  authorNickname?: string;
  /** @format int32 */
  likeCount?: number;
  /** @format date-time */
  createdAt?: string;
  address?: string;
  /** @format int64 */
  wishListCount?: number;
  files?: BoardFileResponse[];
}

export interface RespBoardResponse {
  success?: boolean;
  data?: BoardResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface RespVoid {
  success?: boolean;
  data?: any;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface ReservationRequest {
  /** @format int64 */
  scheduleId?: number;
  /** @format int32 */
  quantity?: number;
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

export interface RespReservationResponse {
  success?: boolean;
  data?: ReservationResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface ReportRequest {
  reportType?: "BOARD" | "COMMENT";
  /** @format int64 */
  contentId?: number;
  reason?: string;
}

export interface UserRequest {
  /**
   * 아이디
   * @minLength 1
   * @example "dev"
   */
  id: string;
  /**
   * 비밀번호
   * @minLength 1
   * @example "@Malsdud0414"
   */
  password: string;
  /**
   * 이름
   * @minLength 1
   * @example "개발용 계정"
   */
  name: string;
  /**
   * 닉네임
   * @minLength 1
   * @example "dev"
   */
  nickname: string;
  /**
   * 전화번호
   * @minLength 1
   * @example "010-5380-0048"
   */
  phone: string;
  /**
   * 이메일
   * @minLength 1
   * @example "0414minyoung@naver.com"
   */
  email: string;
  /**
   * 주소
   * @minLength 1
   * @example "인천 남동구 백범로 124번길 43"
   */
  address: string;
  /**
   * 생년월일
   * @minLength 1
   * @example "2003-04-14"
   */
  birth: string;
}

export interface CartRequest {
  /** @format int64 */
  scheduleId?: number;
  /** @format int32 */
  quantity?: number;
}

export interface ScheduleRequest {
  /** @format date */
  scheduleDate?: string;
  /** @format int32 */
  maxHeadcount?: number;
  price?: number;
}

export interface CommentRequest {
  content?: string;
  /** @format int64 */
  parentId?: number;
}

export interface CommentResponse {
  /** @format int64 */
  id?: number;
  content?: string;
  authorNickname?: string;
  /** @format date-time */
  createdAt?: string;
  children?: CommentResponse[];
}

export interface RespCommentResponse {
  success?: boolean;
  data?: CommentResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface RespListWishListResponse {
  success?: boolean;
  data?: WishListResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface WishListResponse {
  /** @format int64 */
  wishListId?: number;
  /** @format int64 */
  boardId?: number;
  title?: string;
  address?: string;
}

export interface RespListReservationResponse {
  success?: boolean;
  data?: ReservationResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface NotificationResponse {
  /** @format int64 */
  id?: number;
  content?: string;
  url?: string;
  /** @format date-time */
  createdAt?: string;
  read?: boolean;
}

export interface RespListNotificationResponse {
  success?: boolean;
  data?: NotificationResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface SseEmitter {
  /** @format int64 */
  timeout?: number;
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

export interface RespListEventResponse {
  success?: boolean;
  data?: EventResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface RespEventResponse {
  success?: boolean;
  data?: EventResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface MyCommentResponse {
  /** @format int64 */
  commentId?: number;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format int64 */
  boardId?: number;
  boardTitle?: string;
}

export interface RespListMyCommentResponse {
  success?: boolean;
  data?: MyCommentResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface CartItemResponse {
  /** @format int64 */
  cartItemId?: number;
  /** @format int64 */
  scheduleId?: number;
  boardTitle?: string;
  /** @format int32 */
  quantity?: number;
}

export interface CartResponse {
  /** @format int64 */
  cartId?: number;
  items?: CartItemResponse[];
}

export interface RespCartResponse {
  success?: boolean;
  data?: CartResponse;
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface RespListScheduleResponse {
  success?: boolean;
  data?: ScheduleResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface ScheduleResponse {
  /** @format int64 */
  id?: number;
  /** @format date */
  scheduleDate?: string;
  price?: number;
  /** @format int32 */
  maxHeadcount?: number;
  /** @format int32 */
  currentHeadcount?: number;
  /** @format int32 */
  remainingHeadcount?: number;
  soldOut?: boolean;
}

export interface RespListCommentResponse {
  success?: boolean;
  data?: CommentResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
}

export interface RespListBoardResponse {
  success?: boolean;
  data?: BoardResponse[];
  errorMessage?: string;
  /** @format date-time */
  serverDateTime?: string;
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
     * @description 회원의 정보를 변경합니다.
     *
     * @tags 사용자
     * @name UpdateUserInfo
     * @summary 유저 정보 수정
     * @request PUT:/api/user/{id}
     * @secure
     */
    updateUserInfo: (id: number, data: UserUpdateRequest, params: RequestParams = {}) =>
      this.request<RespUserResponse, any>({
        path: `/api/user/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 회원이 탈퇴합니다.
     *
     * @tags 사용자
     * @name DeleteUser
     * @summary 유저 탈퇴
     * @request DELETE:/api/user/{id}
     * @secure
     */
    deleteUser: (id: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 스케줄의 날짜, 정원, 가격 등을 수정합니다.
     *
     * @tags 스케줄 관리
     * @name UpdateSchedule
     * @summary 스케줄 수정
     * @request PUT:/api/user/boards/{boardId}/schedules/{scheduleId}
     * @secure
     */
    updateSchedule: (boardId: number, scheduleId: number, data: ScheduleUpdateRequest, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/boards/${boardId}/schedules/${scheduleId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 특정 스케줄을 삭제합니다. 단, 예약자가 있는 스케줄은 삭제할 수 없습니다.
     *
     * @tags 스케줄 관리
     * @name DeleteSchedule
     * @summary 스케줄 삭제
     * @request DELETE:/api/user/boards/{boardId}/schedules/{scheduleId}
     * @secure
     */
    deleteSchedule: (boardId: number, scheduleId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/boards/${boardId}/schedules/${scheduleId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 게시글 ID로 특정 게시글을 조회합니다. 조회수가 증가합니다.
     *
     * @tags 게시글
     * @name ReadBoard
     * @summary 게시글 단건 조회
     * @request GET:/api/user/board/{boardId}
     * @secure
     */
    readBoard: (boardId: number, params: RequestParams = {}) =>
      this.request<RespBoardResponse, any>({
        path: `/api/user/board/${boardId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 게시글 ID로 특정 게시글의 제목과 내용을 수정합니다.
     *
     * @tags 게시글
     * @name UpdateBoard
     * @summary 게시글 수정
     * @request PUT:/api/user/board/{boardId}
     * @secure
     */
    updateBoard: (boardId: number, data: BoardRequest, params: RequestParams = {}) =>
      this.request<RespBoardResponse, any>({
        path: `/api/user/board/${boardId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 게시글 ID로 특정 게시글을 삭제합니다.
     *
     * @tags 게시글
     * @name DeleteBoard
     * @summary 게시글 삭제
     * @request DELETE:/api/user/board/{boardId}
     * @secure
     */
    deleteBoard: (boardId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/board/${boardId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 게시글 ID를 받아 찜 목록에 추가합니다.
     *
     * @tags 찜하기
     * @name AddWishList
     * @summary 게시글 찜하기
     * @request POST:/api/user/wishlist/{boardId}
     * @secure
     */
    addWishList: (boardId: number, params: RequestParams = {}) =>
      this.request<RespVoid, any>({
        path: `/api/user/wishlist/${boardId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description 게시글 ID를 받아 찜 목록에서 삭제합니다.
     *
     * @tags 찜하기
     * @name DeleteWishList
     * @summary 찜 취소하기
     * @request DELETE:/api/user/wishlist/{boardId}
     * @secure
     */
    deleteWishList: (boardId: number, params: RequestParams = {}) =>
      this.request<RespVoid, any>({
        path: `/api/user/wishlist/${boardId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 스케줄(날짜 옵션)을 지정된 인원수만큼 예약합니다.
     *
     * @tags 예약 관리
     * @name CreateReservation
     * @summary 예약하기
     * @request POST:/api/user/reservation
     * @secure
     */
    createReservation: (data: ReservationRequest, params: RequestParams = {}) =>
      this.request<RespReservationResponse, any>({
        path: `/api/user/reservation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 게시글 또는 댓글을 신고합니다.
     *
     * @tags 신고
     * @name CreateReport
     * @summary 컨텐츠 신고
     * @request POST:/api/user/report
     * @secure
     */
    createReport: (data: ReportRequest, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/report`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 회원가입합니다.
     *
     * @tags 사용자
     * @name Register
     * @summary 회원가입
     * @request POST:/api/user/register
     * @secure
     */
    register: (data: UserRequest, params: RequestParams = {}) =>
      this.request<RespUserResponse, any>({
        path: `/api/user/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 알림을 읽음 상태로 변경하고, 이동할 URL을 반환합니다.
     *
     * @tags 알림 조회
     * @name ReadNotification
     * @summary 알림 읽기 및 이동
     * @request POST:/api/user/notifications/{id}/read
     * @secure
     */
    readNotification: (id: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/notifications/${id}/read`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 게시글(상품)을 지정된 수량만큼 장바구니에 추가합니다.
     *
     * @tags 장바구니
     * @name AddBoardToCart
     * @summary 장바구니에 아이템 추가
     * @request POST:/api/user/items
     * @secure
     */
    addBoardToCart: (data: CartRequest, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/items`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자가 이벤트에 참가 신청을 합니다.
     *
     * @tags 이벤트 & 공지사항
     * @name JoinEvent
     * @summary 이벤트 참가
     * @request POST:/api/user/events/{eventId}/join
     * @secure
     */
    joinEvent: (eventId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/events/${eventId}/join`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description 사용자가 이벤트 참가를 취소합니다.
     *
     * @tags 이벤트 & 공지사항
     * @name CancelEventParticipation
     * @summary 이벤트 참가 취소
     * @request DELETE:/api/user/events/{eventId}/join
     * @secure
     */
    cancelEventParticipation: (eventId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/events/${eventId}/join`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 게시글에 포함된 모든 예약 옵션(스케줄)을 조회합니다.
     *
     * @tags 스케줄 관리
     * @name GetSchedulesForBoard
     * @summary 게시글의 스케줄 목록 조회
     * @request GET:/api/user/boards/{boardId}/schedules
     * @secure
     */
    getSchedulesForBoard: (boardId: number, params: RequestParams = {}) =>
      this.request<RespListScheduleResponse, any>({
        path: `/api/user/boards/${boardId}/schedules`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 게시글에 하나 이상의 예약 옵션(스케줄)을 추가합니다.
     *
     * @tags 스케줄 관리
     * @name AddSchedulesToBoard
     * @summary 게시글에 스케줄 추가
     * @request POST:/api/user/boards/{boardId}/schedules
     * @secure
     */
    addSchedulesToBoard: (boardId: number, data: ScheduleRequest[], params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/boards/${boardId}/schedules`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 게시글에 매핑된 댓글을 조회합니다.
     *
     * @tags 댓글
     * @name GetComments
     * @summary 게시글에 작성된 댓글을 조회할 수 있습니다.
     * @request GET:/api/user/boards/{boardId}/comments
     * @secure
     */
    getComments: (boardId: number, params: RequestParams = {}) =>
      this.request<RespListCommentResponse, any>({
        path: `/api/user/boards/${boardId}/comments`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 댓글 및 대댓글까지 생성 가능합니다.
     *
     * @tags 댓글
     * @name CreateComment
     * @summary 댓글을 생성합니다.
     * @request POST:/api/user/boards/{boardId}/comments
     * @secure
     */
    createComment: (boardId: number, data: CommentRequest, params: RequestParams = {}) =>
      this.request<RespCommentResponse, any>({
        path: `/api/user/boards/${boardId}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 모든 게시글 목록을 조회합니다.
     *
     * @tags 게시글
     * @name ReadBoardList
     * @summary 게시글 목록 조회
     * @request GET:/api/user/board
     * @secure
     */
    readBoardList: (
      query?: {
        /** 필터링할 타입 (먹거리, 놀거리, 잘거리) */
        boardType?: "EAT" | "PLAY" | "STAY";
      },
      params: RequestParams = {},
    ) =>
      this.request<RespListBoardResponse, any>({
        path: `/api/user/board`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 게시판을 추가합니다. 파일 업로드도 가능합니다.
     *
     * @tags 게시글
     * @name CreateBoard
     * @summary 게시판 추가
     * @request POST:/api/user/board
     * @secure
     */
    createBoard: (
      data: {
        /** 게시글 정보(JSON) */
        boardRequest: string;
        /** 첨부 파일들 */
        files?: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<RespBoardResponse, any>({
        path: `/api/user/board`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 게시글에 대한 좋아요를 추가하거나 취소합니다.
     *
     * @tags 게시글
     * @name ToggleLike
     * @summary 게시글 좋아요 토글
     * @request POST:/api/user/board/{boardId}/like
     * @secure
     */
    toggleLike: (boardId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/board/${boardId}/like`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description 댓글을 작성한 사람 및 관리자만 삭제가 가능합니다.
     *
     * @tags 댓글
     * @name DeleteComment
     * @summary 댓글을 삭제합니다.
     * @request DELETE:/api/user/comments/{commentId}
     * @secure
     */
    deleteComment: (commentId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 댓글을 작성한 사람만 수정이 가능합니다.
     *
     * @tags 댓글
     * @name UpdateComment
     * @summary 댓글을 수정합니다.
     * @request PATCH:/api/user/comments/{commentId}
     * @secure
     */
    updateComment: (commentId: number, data: CommentRequest, params: RequestParams = {}) =>
      this.request<RespCommentResponse, any>({
        path: `/api/user/comments/${commentId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 마이페이지에서 로그인한 회원의 정보를 확인합니다.
     *
     * @tags 사용자
     * @name GetMyInfo
     * @summary 사용자 정보 조회
     * @request GET:/api/user
     * @secure
     */
    getMyInfo: (params: RequestParams = {}) =>
      this.request<RespUserResponse, any>({
        path: `/api/user`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 내가 찜한 게시글 목록을 조회합니다.
     *
     * @tags 찜하기
     * @name GetMyWishList
     * @summary 내 찜 목록 조회
     * @request GET:/api/user/wishlist
     * @secure
     */
    getMyWishList: (params: RequestParams = {}) =>
      this.request<RespListWishListResponse, any>({
        path: `/api/user/wishlist`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 현재 위치(주소)를 기준으로 반경 내에 있는 찜 목록만 보여줍니다.
     *
     * @tags 찜하기
     * @name GetMyNearbyWishList
     * @summary 내 주변 찜 목록 조회
     * @request GET:/api/user/wishlist/nearby
     * @secure
     */
    getMyNearbyWishList: (
      query: {
        address: string;
        /** @format double */
        radius?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RespListWishListResponse, any>({
        path: `/api/user/wishlist/nearby`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 옵션에 따라 전체, 예약중, 취소된 내역을 조회합니다. (type: ALL, RESERVED, CANCELED)
     *
     * @tags 예약 관리
     * @name GetMyReservations
     * @summary 내 예약 목록 조회
     * @request GET:/api/user/reservation/list
     * @secure
     */
    getMyReservations: (
      query?: {
        /** 조회할 타입 (ALL, RESERVED, CANCELED) */
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RespListReservationResponse, any>({
        path: `/api/user/reservation/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 나에게 온 알림 목록들을 조회합니다.
     *
     * @tags 알림 조회
     * @name GetNotification
     * @summary 나의 알림 조회
     * @request GET:/api/user/notifications
     * @secure
     */
    getNotification: (params: RequestParams = {}) =>
      this.request<RespListNotificationResponse, any>({
        path: `/api/user/notifications`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 실시간 알림을 보내는 기능입니다.
     *
     * @tags 알림 조회
     * @name Subscribe
     * @summary 실시간 알림을 보내는 기능
     * @request GET:/api/user/notification/subscribe
     * @secure
     */
    subscribe: (params: RequestParams = {}) =>
      this.request<SseEmitter, any>({
        path: `/api/user/notification/subscribe`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 모든 이벤트와 공지사항 목록을 조회합니다. type 파라미터로 필터링할 수 있습니다.
     *
     * @tags 이벤트 & 공지사항
     * @name GetAllEvents
     * @summary 이벤트/공지사항 목록 조회
     * @request GET:/api/user/events
     * @secure
     */
    getAllEvents: (
      query?: {
        /** 필터링할 타입 (EVENT 또는 NOTICE) */
        type?: "EVENT" | "NOTICE";
      },
      params: RequestParams = {},
    ) =>
      this.request<RespListEventResponse, any>({
        path: `/api/user/events`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description ID로 특정 이벤트나 공지사항의 상세 정보를 조회합니다.
     *
     * @tags 이벤트 & 공지사항
     * @name GetEventById
     * @summary 특정 이벤트/공지사항 조회
     * @request GET:/api/user/events/{eventId}
     * @secure
     */
    getEventById: (eventId: number, params: RequestParams = {}) =>
      this.request<RespEventResponse, any>({
        path: `/api/user/events/${eventId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 내가 작성한 댓글들을 최신순으로 조회합니다.
     *
     * @tags 댓글
     * @name GetMyComments
     * @summary 내가 쓴 댓글 목록
     * @request GET:/api/user/comments
     * @secure
     */
    getMyComments: (params: RequestParams = {}) =>
      this.request<RespListMyCommentResponse, any>({
        path: `/api/user/comments`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 현재 로그인한 사용자의 장바구니에 담긴 모든 아이템 목록을 조회합니다.
     *
     * @tags 장바구니
     * @name GetMyCart
     * @summary 내 장바구니 조회
     * @request GET:/api/user/cartList
     * @secure
     */
    getMyCart: (params: RequestParams = {}) =>
      this.request<RespCartResponse, any>({
        path: `/api/user/cartList`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 주소와 반경(km)을 입력받아 주변 게시글을 찾습니다.
     *
     * @tags 게시글
     * @name FindNearbyBoards
     * @summary 내 주변 게시글 조회
     * @request GET:/api/user/boards/nearby
     * @secure
     */
    findNearbyBoards: (
      query: {
        /** 내 주소 (예: 서울시청) */
        address: string;
        /**
         * 검색 반경(km) (기본값: 10km)
         * @format double
         * @default 10
         */
        radius?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RespListBoardResponse, any>({
        path: `/api/user/boards/nearby`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 좋아요 한 게시글 목록을 확인합니다.
     *
     * @tags 게시글
     * @name ReadBoardLikeList
     * @summary 좋아요 한 게시글 목록 확인
     * @request GET:/api/user/boardLikes
     * @secure
     */
    readBoardLikeList: (params: RequestParams = {}) =>
      this.request<RespListBoardResponse, any>({
        path: `/api/user/boardLikes`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 자신의 예약 내역 중 특정 예약을 취소합니다.
     *
     * @tags 예약 관리
     * @name CancelReservation
     * @summary 예약 취소
     * @request DELETE:/api/user/reservations/{reservationId}
     * @secure
     */
    cancelReservation: (reservationId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/reservations/${reservationId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 장바구니에서 특정 아이템을 삭제합니다.
     *
     * @tags 장바구니
     * @name RemoveCartItem
     * @summary 장바구니 아이템 삭제
     * @request DELETE:/api/user/items/{cartItemId}
     * @secure
     */
    removeCartItem: (cartItemId: number, params: RequestParams = {}) =>
      this.request<RespString, any>({
        path: `/api/user/items/${cartItemId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
