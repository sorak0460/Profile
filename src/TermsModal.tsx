import { useState, useRef, useEffect } from 'react';
import type { UIEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export default function TermsModal({ isOpen, onAccept }: TermsModalProps) {
  const [canAccept, setCanAccept] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // If content is too short to scroll, unlock immediately
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const el = contentRef.current;
      if (el.scrollHeight <= el.clientHeight) {
        setCanAccept(true);
      }
    }
  }, [isOpen]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    // Add a 10px threshold for bottom detection
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 10) {
      setCanAccept(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          data-lenis-prevent="true"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="modal-box"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
          >
            <h2 className="modal-title">TERMS OF SERVICE</h2>
            <p className="modal-subtitle">サイト利用規約（重要）</p>
            
            <div className="modal-content" onScroll={handleScroll} ref={contentRef} data-lenis-prevent="true">
              <h3>第1条（著作権・無断複製・リバースエンジニアリングの禁止）</h3>
              <p>
                本サイト（ソースコード、デザイン、テキスト、画像、アニメーション実装等の全て）に関する著作権およびその他の一切の知的財産権は、制作者（Sora K）に帰属します。
                いかなる理由があっても、本サイトの無断複製、無断転載、ソースコードの流用、改変、リバースエンジニアリングを固く禁じます。
              </p>

              <h3>第2条（ミラーサイト・ソースコード盗用の禁止と法的措置）</h3>
              <p>
                本サイトのデザインや構造を模倣した悪質なミラーサイトの作成、またはソースコードの無断盗用が発覚した場合、直ちに以下の措置を講じます。
                <br /><br />
                1. 検索エンジン（Google等）に対する <strong>DMCA（デジタルミレニアム著作権法）に基づく著作権侵害申し立て</strong> およびインデックス削除請求。<br />
                2. 該当サイトのサーバーホスティング事業者への <strong>テイクダウン（サーバー凍結・サイト削除）申請</strong>。<br />
                3. 悪質性が高いと判断された場合、法的措置および損害賠償請求。
              </p>

              <h3>第3条（個人情報の無断配布・なりすましの禁止）</h3>
              <p>
                制作者の個人情報や、紐づくSNSアカウントのリンク等を無断で第三者に配布・共有する行為を禁じます。
                また、「自分が制作した」などの自作発言（なりすまし行為）も一切禁止します。
              </p>

              <h3>第4条（免責事項）</h3>
              <p>
                本サイトの利用により生じたいかなるトラブルや損害についても、制作者は一切の責任を負いません。
                本規約は予告なく変更される場合があり、変更後に本サイトを利用した時点で、変更後の規約に同意したものとみなします。
              </p>

              <div className="modal-scroll-indicator">
                {canAccept ? "✓ 最後までお読みいただきありがとうございます" : "↓ 最後までスクロールして同意してください"}
              </div>
            </div>

            <div className="modal-footer">
              <AnimatePresence>
                {canAccept && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  >
                    <Magnetic>
                      <button className="modal-accept-btn" onClick={onAccept}>
                        AGREE / 了承する
                      </button>
                    </Magnetic>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
