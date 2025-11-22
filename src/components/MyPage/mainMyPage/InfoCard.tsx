import React from 'react';
import type { UserResponse } from '../../../api/user/userApi';

interface Props {
  userInfo: UserResponse;
}

const InfoCard = ({ userInfo }: Props) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="info-card">
          <h3>기본 정보</h3>
          <ul className="info-list">
            <InfoItem icon="person-fill" label="이름" value={userInfo.name} />
            <InfoItem icon="emoji-smile-fill" label="닉네임" value={userInfo.nickname} />
            <InfoItem icon="telephone-fill" label="전화번호" value={userInfo.phone} />
            <InfoItem icon="envelope-fill" label="이메일" value={userInfo.email} />
            <InfoItem icon="geo-alt-fill" label="주소" value={userInfo.address} />
          </ul>
        </div>
      </div>
    </div>
  );
};

// 내부에서만 쓸 작은 부품
const InfoItem = ({ icon, label, value }: { icon: string, label: string, value?: string }) => (
  <li className="info-item">
    <div className="info-icon"><i className={`bi bi-${icon}`}></i></div>
    <div className="info-label">{label}</div>
    <div className="info-value">{value || "-"}</div>
  </li>
);

export default InfoCard;