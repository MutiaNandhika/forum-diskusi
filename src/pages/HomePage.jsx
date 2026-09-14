import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from '../states/threads/action';
import { setFilterCategoryActionCreator } from '../states/filterCategory/action';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import CategoryChips from '../components/threads/CategoryChips';
import ThreadList from '../components/threads/ThreadList';
import Sidebar from '../components/layout/Sidebar';

function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const {
    threads = [],
    users = [],
    authUser = null,
    filterCategory = '',
    leaderboards = [],
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const categories = useMemo(() => {
    const set = new Set();
    threads.forEach((thread) => {
      if (thread?.category) {
        set.add(thread.category);
      }
    });
    return Array.from(set);
  }, [threads]);

  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      if (!thread) return false;
      const matchCategory = filterCategory
        ? thread.category?.toLowerCase() === filterCategory.toLowerCase()
        : true;
      const matchKeyword = searchKeyword
        ? (thread.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          thread.body?.toLowerCase().includes(searchKeyword.toLowerCase()))
        : true;
      return matchCategory && matchKeyword;
    });
  }, [threads, filterCategory, searchKeyword]);

  function onSelectCategory(category) {
    dispatch(setFilterCategoryActionCreator(category));
  }

  function onUpVoteThread(id) {
    dispatch(asyncToggleUpVoteThread(id));
  }

  function onDownVoteThread(id) {
    dispatch(asyncToggleDownVoteThread(id));
  }

  return (
    <div className="home-page">
      {/* Hero Welcome Banner */}
      <section className="hero-section">
        <h1 className="hero-title">Temukan & Bagikan Solusi Coding</h1>
        <p className="hero-subtitle">
          Ruang diskusi terbuka untuk bertanya, berdiskusi topik pemrograman,
          dan bertukar pengalaman dengan sesama developer.
        </p>
      </section>

      {/* Main Grid Layout */}
      <div className="layout-grid">
        <main>
          {/* Search bar & Category Chips */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  color: 'var(--text-dim)',
                }}
              />
              <input
                type="text"
                placeholder="Cari topik diskusi atau kata kunci..."
                className="form-input"
                style={{ paddingLeft: '42px' }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>

            <CategoryChips
              categories={categories}
              selectedCategory={filterCategory}
              onSelectCategory={onSelectCategory}
            />
          </div>

          {/* Threads List */}
          <ThreadList
            threads={filteredThreads}
            users={users}
            authUserId={authUser?.id}
            onUpVote={onUpVoteThread}
            onDownVote={onDownVoteThread}
          />
        </main>

        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={filterCategory}
          onSelectCategory={onSelectCategory}
          leaderboards={leaderboards}
        />
      </div>

      {/* Floating Action Button to Create Thread */}
      <Link
        to="/new"
        className="fab-new-thread"
        title="Buat Topik Diskusi Baru"
      >
        <Plus size={20} />
        <span>Buat Diskusi</span>
      </Link>
    </div>
  );
}

export default HomePage;
