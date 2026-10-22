import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  Search, ShoppingBag, Heart, UserRound, Menu, X, Sparkles, ArrowRight, Star,
  SlidersHorizontal, Plus, Minus, Trash2, ChevronRight, PackageCheck, ShieldCheck,
  Truck, RotateCcw, MessageCircle, Send, LayoutDashboard, LogOut, CircleUserRound,
  Check, Filter, ShoppingCart, TrendingUp, Users, Boxes, Eye, WandSparkles
} from 'lucide-react'

const STORE_KEY = 'shopsphere-state-v1'
const money = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n || 0))
const readStore = () => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {} } catch { return {} }
}
const initialStore = readStore()
const seedProducts = [
  { id: 101, title: 'Studio Wireless Headphones', description: 'Immersive sound, soft memory-foam cushions, and all-day comfort. Designed for focused work and your favourite playlists.', price: 3499, discountPercentage: 18, rating: 4.7, stock: 24, brand: 'SoundArc', category: 'audio', thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', tags: ['audio','headphones','wireless'] },
  { id: 102, title: 'Everyday Smart Watch', description: 'A minimalist smartwatch with activity tracking, notifications, and a bright always-ready display.', price: 5299, discountPercentage: 12, rating: 4.5, stock: 18, brand: 'Pulse', category: 'wearables', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85', tags: ['watch','wearables'] },
  { id: 103, title: 'Classic Everyday Sneakers', description: 'Versatile low-top sneakers with a cushioned footbed and a clean silhouette for everyday wear.', price: 2799, discountPercentage: 15, rating: 4.6, stock: 31, brand: 'Northline', category: 'fashion', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', tags: ['shoes','fashion'] },
  { id: 104, title: 'Compact Mirrorless Camera', description: 'Capture everyday stories in rich detail with fast autofocus and a portable, travel-ready body.', price: 42999, discountPercentage: 8, rating: 4.8, stock: 7, brand: 'Lumina', category: 'electronics', thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85', tags: ['camera','electronics'] },
  { id: 105, title: 'Ceramic Pour-Over Set', description: 'A considered coffee ritual starts here: durable ceramic dripper, matching cup, and a simple modern finish.', price: 1499, discountPercentage: 10, rating: 4.4, stock: 42, brand: 'Morrow', category: 'home', thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', tags: ['coffee','home'] },
  { id: 106, title: 'Portable Bluetooth Speaker', description: 'Big, balanced sound in a compact speaker built for desk sessions, picnics, and weekend getaways.', price: 2199, discountPercentage: 20, rating: 4.3, stock: 14, brand: 'SoundArc', category: 'audio', thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85', tags: ['speaker','audio'] },
  { id: 107, title: 'Daily Carry Backpack', description: 'Smart organisation, padded laptop storage, and weather-resistant fabric in a lightweight everyday bag.', price: 1899, discountPercentage: 5, rating: 4.2, stock: 28, brand: 'Northline', category: 'fashion', thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', tags: ['bag','fashion'] },
  { id: 108, title: 'Desk LED Ambient Lamp', description: 'Soft, adjustable lighting with a compact footprint for your reading nook or work-from-home setup.', price: 999, discountPercentage: 10, rating: 4.1, stock: 36, brand: 'Morrow', category: 'home', thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', tags: ['lamp','home'] },
  { id: 109, title: 'Ultra Slim Laptop', description: 'A lightweight productivity companion with a crisp display, fast storage, and a premium metal finish.', price: 58999, discountPercentage: 7, rating: 4.6, stock: 9, brand: 'Vertex', category: 'electronics', thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85', tags: ['laptop','electronics'] },
  { id: 110, title: 'Hydration Bottle 750ml', description: 'A reusable, leak-resistant bottle that keeps hydration easy at work, at the gym, or on the move.', price: 699, discountPercentage: 0, rating: 4.4, stock: 65, brand: 'Morrow', category: 'home', thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85', tags: ['bottle','home'] },
  { id: 111, title: 'Wireless Ergonomic Mouse', description: 'Precise tracking and a comfortable shape for long work sessions, with easy wireless connectivity.', price: 1299, discountPercentage: 14, rating: 4.5, stock: 20, brand: 'Vertex', category: 'electronics', thumbnail: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85', tags: ['mouse','electronics'] },
  { id: 112, title: 'Soft Knit Throw Blanket', description: 'A soft textured throw that adds a warm, relaxed layer to your sofa, reading chair, or bedroom.', price: 1699, discountPercentage: 9, rating: 4.7, stock: 16, brand: 'Morrow', category: 'home', thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85', tags: ['blanket','home'] }
]

function App() {
  const [products, setProducts] = useState(initialStore.products?.length ? initialStore.products : seedProducts)
  const [cart, setCart] = useState(initialStore.cart || [])
  const [wishlist, setWishlist] = useState(initialStore.wishlist || [])
  const [user, setUser] = useState(initialStore.user || null)
  const [orders, setOrders] = useState(initialStore.orders || [])
  const [reviews, setReviews] = useState(initialStore.reviews || {})
  const [analytics, setAnalytics] = useState(initialStore.analytics || { impressions: 0, clicks: 0 })
  const [toast, setToast] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [assistantMessages, setAssistantMessages] = useState([{ role: 'assistant', text: 'Hi! Tell me what you are shopping for, your budget, or what matters most to you.' }])

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ products, cart, wishlist, user, orders, reviews, analytics }))
  }, [products, cart, wishlist, user, orders, reviews, analytics])

  useEffect(() => {
    let active = true
    fetch('https://dummyjson.com/products?limit=30')
      .then(r => { if (!r.ok) throw new Error('API unavailable'); return r.json() })
      .then(data => {
        if (!active || !data.products?.length) return
        const remote = data.products.map(p => ({
          ...p, category: String(p.category || 'other').toLowerCase().replaceAll(' ', '-'),
          thumbnail: p.thumbnail || p.images?.[0] || '', stock: p.stock ?? 10,
          discountPercentage: p.discountPercentage ?? 0, tags: p.tags || []
        }))
        const extras = products.filter(p => p.id >= 101)
        setProducts([...remote, ...extras.filter(e => !remote.some(p => p.id === e.id))])
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  const addToCart = (product, qty = 1) => {
    setCart(old => {
      const found = old.find(x => x.id === product.id)
      return found ? old.map(x => x.id === product.id ? { ...x, qty: x.qty + qty } : x) : [...old, { ...product, qty }]
    })
    notify('Added to your bag')
  }
  const toggleWishlist = (product) => {
    setWishlist(old => old.some(x => x.id === product.id) ? old.filter(x => x.id !== product.id) : [...old, product])
    notify(wishlist.some(x => x.id === product.id) ? 'Removed from wishlist' : 'Saved to wishlist')
  }
  const changeQty = (id, delta) => setCart(old => old.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x))
  const removeCart = (id) => setCart(old => old.filter(x => x.id !== id))
  const submitOrder = (form) => {
    const order = { id: 'SS-' + Date.now().toString().slice(-7), date: new Date().toISOString(), items: cart, total: cart.reduce((s, x) => s + x.price * x.qty, 0), status: 'Processing', customer: user?.name || form.name, email: user?.email || form.email, address: form.address }
    setOrders(old => [order, ...old]); setCart([]); notify('Order placed successfully'); return order
  }
  const login = (email, password, name) => {
    const admin = email.toLowerCase() === 'admin@shopsphere.ai'
    const nextUser = { name: name || (admin ? 'ShopSphere Admin' : email.split('@')[0]), email, role: admin ? 'admin' : 'customer' }
    setUser(nextUser); notify('Welcome to ShopSphere'); return nextUser
  }
  const logout = () => { setUser(null); notify('You have been signed out') }
  const assistantReply = (message) => {
    const text = message.toLowerCase()
    const budgetMatch = text.match(/(?:under|below|less than|budget(?: of)?|within)\s*₹?\s*([\d,]+)/i) || text.match(/₹\s*([\d,]+)/)
    const budget = budgetMatch ? Number(budgetMatch[1].replaceAll(',', '')) : null
    const categoryWords = ['audio','headphones','speaker','electronics','laptop','camera','fashion','shoes','home','coffee','wearables','watch']
    const cat = categoryWords.find(c => text.includes(c))
    let found = products.filter(p => (!budget || p.price <= budget) && (!cat || `${p.category} ${p.title} ${(p.tags || []).join(' ')}`.toLowerCase().includes(cat)))
    if (text.includes('rating') || text.includes('review') || text.includes('best rated')) found = found.sort((a,b) => b.rating-a.rating)
    else if (text.includes('cheap') || text.includes('affordable') || text.includes('lowest price')) found = found.sort((a,b) => a.price-b.price)
    else found = found.sort((a,b) => (b.rating || 0) - (a.rating || 0))
    setAssistantMessages(old => [...old, { role: 'user', text: message }, { role: 'assistant', text: found.length ? `I found ${found.length} option${found.length > 1 ? 's' : ''}${budget ? ` within ${money(budget)}` : ''}. My top picks are: ${found.slice(0,3).map(p => `${p.title} (${money(p.price)}, ★ ${p.rating})`).join('; ')}. Open the products below to compare details.` : 'I could not find a close match for those exact constraints. Try a category like audio, electronics, home, or a budget such as under ₹3000.' , productIds: found.slice(0,3).map(p=>p.id) }])
    setAnalytics(a => ({ ...a, impressions: a.impressions + 1, clicks: a.clicks + (found.length ? 1 : 0) }))
  }

  const shared = { products, cart, wishlist, user, orders, reviews, setReviews, analytics, setProducts, setOrders, addToCart, toggleWishlist, changeQty, removeCart, notify, submitOrder, login, logout, assistantReply, assistantMessages, setAssistantMessages, assistantOpen, setAssistantOpen }
  const cartCount = cart.reduce((s, x) => s + x.qty, 0)

  return <div className="app-shell">
    <div className="announcement"><Sparkles size={14}/> Meet your smarter way to shop <span>— curated picks, made for you</span></div>
    <header className="site-header">
      <button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button>
      <Link to="/" className="brand"><span className="brand-mark"><ShoppingBag size={21}/></span><span>shop<span className="brand-ai">sphere</span><small>AI</small></span></Link>
      <form className="header-search" onSubmit={e => { e.preventDefault(); window.location.href = '/?q=' + encodeURIComponent(e.currentTarget.elements.q.value) }}>
        <Search size={18}/><input name="q" placeholder="Search products, brands and more..." aria-label="Search products"/><button type="submit">Search</button>
      </form>
      <div className="header-actions">
        <Link className="header-action" to="/wishlist"><Heart size={20}/><span>Wishlist</span>{wishlist.length > 0 && <b className="count">{wishlist.length}</b>}</Link>
        <Link className="header-action" to={user ? '/account' : '/login'}><UserRound size={20}/><span>{user ? user.name.split(' ')[0] : 'Account'}</span></Link>
        <Link className="header-action bag-action" to="/cart"><ShoppingCart size={21}/><span>Bag</span><b className="count">{cartCount}</b></Link>
      </div>
    </header>
    <nav className={`main-nav ${mobileOpen ? 'nav-open' : ''}`}>
      <div className="nav-inner">
        <NavLink to="/" end>Discover</NavLink><NavLink to="/?category=electronics">Electronics</NavLink><NavLink to="/?category=audio">Audio</NavLink><NavLink to="/?category=fashion">Fashion</NavLink><NavLink to="/?category=home">Home & Living</NavLink><button className="nav-assistant" onClick={() => setAssistantOpen(true)}><Sparkles size={15}/> Shop with AI</button>
        <span className="nav-spacer"/>{user?.role === 'admin' && <NavLink to="/admin">Admin dashboard</NavLink>}
      </div>
    </nav>
    <main><Routes>
      <Route path="/" element={<Home {...shared} />}/>
      <Route path="/product/:id" element={<ProductPage {...shared}/>}/>
      <Route path="/cart" element={<CartPage {...shared}/>}/>
      <Route path="/wishlist" element={<WishlistPage {...shared}/>}/>
      <Route path="/login" element={<LoginPage {...shared}/>}/>
      <Route path="/register" element={<LoginPage {...shared} register/>}/>
      <Route path="/checkout" element={<CheckoutPage {...shared}/>}/>
      <Route path="/orders" element={<OrdersPage {...shared}/>}/>
      <Route path="/account" element={<AccountPage {...shared}/>}/>
      <Route path="/admin" element={<AdminPage {...shared}/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes></main>
    <Footer/>
    <button className="assistant-fab" onClick={() => setAssistantOpen(true)} aria-label="Open shopping assistant"><Sparkles size={21}/><span>Ask ShopSphere AI</span></button>
    {assistantOpen && <AssistantPanel {...shared}/>}
    {toast && <div className="toast"><Check size={17}/>{toast}</div>}
  </div>
}

function ProductCard({ product, addToCart, toggleWishlist, wishlist }) {
  const saved = wishlist.some(x => x.id === product.id)
  const discounted = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100))
  return <article className="product-card">
    <div className="product-image-wrap">
      <Link to={`/product/${product.id}`} className="product-image-link"><img src={product.thumbnail || product.images?.[0]} alt={product.title} loading="lazy" onError={e => { e.currentTarget.src = 'https://placehold.co/600x500/f0f1f7/7a7d91?text=ShopSphere' }}/></Link>
      {(product.discountPercentage || 0) > 0 && <span className="discount-tag">{Math.round(product.discountPercentage)}% OFF</span>}
      <button className={`heart-button ${saved ? 'saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}><Heart size={18} fill={saved ? 'currentColor' : 'none'}/></button>
      <button className="quick-add" onClick={() => addToCart(product)}><Plus size={16}/> Quick add</button>
    </div>
    <div className="product-info">
      <div className="product-brand">{product.brand || product.category}</div>
      <Link to={`/product/${product.id}`} className="product-title">{product.title}</Link>
      <div className="rating-line"><span className="rating-chip"><Star size={12} fill="currentColor"/>{Number(product.rating || 4.2).toFixed(1)}</span><span className="rating-count">({product.reviews?.length || Math.floor((product.id % 39) + 12)})</span></div>
      <div className="price-line"><strong>{money(discounted)}</strong>{product.discountPercentage > 0 && <><del>{money(product.price)}</del><span className="save-text">Save {Math.round(product.discountPercentage)}%</span></>}</div>
    </div>
  </article>
}

function Home(props) {
  const { products, addToCart, toggleWishlist, wishlist, analytics } = props
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'all')
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState('all')
  const [minRating, setMinRating] = useState('0')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  useEffect(() => { setQuery(params.get('q') || ''); setCategory(params.get('category') || 'all') }, [params])
  const categories = useMemo(() => [...new Set(products.map(p => p.category).filter(Boolean))].sort(), [products])
  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const search = `${p.title} ${p.brand || ''} ${p.category} ${(p.tags || []).join(' ')}`.toLowerCase()
      return (!query || search.includes(query.toLowerCase())) && (category === 'all' || p.category === category) && (maxPrice === 'all' || p.price <= Number(maxPrice)) && Number(p.rating || 0) >= Number(minRating)
    })
    if (sort === 'price-low') list.sort((a,b) => a.price-b.price)
    if (sort === 'price-high') list.sort((a,b) => b.price-a.price)
    if (sort === 'rating') list.sort((a,b) => b.rating-a.rating)
    if (sort === 'discount') list.sort((a,b) => (b.discountPercentage||0)-(a.discountPercentage||0))
    return list
  }, [products, query, category, maxPrice, minRating, sort])
  const pageSize = 8
  const visible = filtered.slice((page-1)*pageSize, page*pageSize)
  const setCat = (cat) => { setCategory(cat); setPage(1); setParams(p => { const next = new URLSearchParams(p); cat === 'all' ? next.delete('category') : next.set('category', cat); return next }) }
  return <div className="page-container">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot"/> YOUR TASTE. YOUR WORLD.</div>
        <h1>Find your next<br/><span>favourite thing.</span></h1>
        <p>Thoughtfully picked products, smarter recommendations, and a shopping experience that gets you.</p>
        <div className="hero-buttons"><a className="button button-dark" href="#products">Explore products <ArrowRight size={17}/></a><button className="button button-light" onClick={() => props.setAssistantOpen(true)}><Sparkles size={17}/> Ask AI to help</button></div>
        <div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><strong>Loved by curious shoppers</strong><small>Personalised picks, less scrolling</small></div></div>
      </div>
      <div className="hero-art"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-card hero-card-main"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85" alt="Wireless headphones"/><div className="floating-rating"><Star size={14} fill="currentColor"/> 4.9 <span>top rated</span></div></div><div className="floating-note note-top"><Sparkles size={16}/><div><b>Picked for you</b><small>Based on your interests</small></div></div><div className="floating-note note-bottom"><span className="note-check"><Check size={16}/></span><div><b>Smart savings</b><small>Great finds, better prices</small></div></div><div className="hero-sticker">GOOD<br/>FINDS<br/><span>ONLY ✳</span></div></div>
      <div className="hero-bottom-label">DISCOVER • COMPARE • LOVE</div>
    </section>
    <section className="trust-strip"><div><Truck/><span><b>Free delivery</b><small>On orders over ₹999</small></span></div><div><ShieldCheck/><span><b>Secure checkout</b><small>Safe shopping, always</small></span></div><div><RotateCcw/><span><b>Easy returns</b><small>Hassle-free experience</small></span></div><div><Sparkles/><span><b>Made personal</b><small>Recommendations for you</small></span></div></section>
    <section className="section-block category-section"><div className="section-heading"><div><div className="eyebrow">A LITTLE BIT OF EVERYTHING</div><h2>Explore your world</h2></div><span className="muted-text">Find something that fits your life.</span></div><div className="category-grid">
      {[{id:'electronics',name:'Tech & gadgets',emoji:'⌁',desc:'Upgrade your everyday',bg:'lavender'},{id:'audio',name:'Sound & audio',emoji:'♫',desc:'Find your frequency',bg:'peach'},{id:'fashion',name:'Style essentials',emoji:'✳',desc:'Your everyday uniform',bg:'mint'},{id:'home',name:'Home & living',emoji:'⌂',desc:'Make room for comfort',bg:'yellow'}].map(c=><button key={c.id} className={`category-tile ${c.bg}`} onClick={()=>{setCat(c.id);document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}}><span className="category-emoji">{c.emoji}</span><span className="category-title">{c.name}</span><span className="category-desc">{c.desc}</span><span className="category-arrow"><ArrowRight size={17}/></span></button>)}
    </div></section>
    <section className="section-block" id="products">
      <div className="section-heading product-heading"><div><div className="eyebrow">THE GOOD STUFF</div><h2>Made for your next obsession <span className="heading-sparkle">✳</span></h2><p className="muted-text">Browse the edit. Your next favourite is in here somewhere.</p></div><div className="result-count">{filtered.length} products</div></div>
      <div className="catalog-layout">
        <aside className={`filters-panel ${filtersOpen?'filters-open':''}`}><div className="filter-title"><span><SlidersHorizontal size={17}/> Filters</span><button className="text-button" onClick={()=>{setCat('all');setMaxPrice('all');setMinRating('0');setQuery('')}}>Reset</button></div><div className="filter-group"><h4>Categories</h4><label className="radio-line"><input type="radio" checked={category==='all'} onChange={()=>setCat('all')}/> All products</label>{categories.map(c=><label className="radio-line" key={c}><input type="radio" checked={category===c} onChange={()=>setCat(c)}/> {c.replaceAll('-',' ')}</label>)}</div><div className="filter-group"><h4>Price range</h4><select value={maxPrice} onChange={e=>{setMaxPrice(e.target.value);setPage(1)}}><option value="all">Any price</option><option value="1000">Under ₹1,000</option><option value="3000">Under ₹3,000</option><option value="5000">Under ₹5,000</option><option value="10000">Under ₹10,000</option><option value="50000">Under ₹50,000</option></select></div><div className="filter-group"><h4>Customer rating</h4>{[['0','Any rating'],['4','4★ & above'],['4.5','4.5★ & above']].map(([v,l])=><label className="radio-line" key={v}><input type="radio" checked={minRating===v} onChange={()=>setMinRating(v)}/>{l}</label>)}</div><div className="filter-tip"><Sparkles size={17}/><p><b>Need a hand?</b><br/>Tell our AI what you need and it will narrow things down.</p><button onClick={()=>props.setAssistantOpen(true)}>Find my fit <ArrowRight size={14}/></button></div></aside>
        <div className="catalog-main"><div className="catalog-toolbar"><label className="search-inline"><Search size={17}/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search this collection..."/></label><button className="filter-mobile-button" onClick={()=>setFiltersOpen(!filtersOpen)}><Filter size={16}/> Filters</button><label className="sort-control">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Recommended</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="discount">Biggest discount</option></select></label></div>
          {visible.length ? <div className="product-grid">{visible.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist}/>)}</div> : <div className="empty-state"><Search size={30}/><h3>No products found</h3><p>Try a different search or clear your filters.</p><button className="button button-dark" onClick={()=>{setQuery('');setCat('all');setMaxPrice('all');setMinRating('0')}}>Clear filters</button></div>}
          {filtered.length > pageSize && <div className="pagination"><button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Previous</button><span>Page {page} of {Math.ceil(filtered.length/pageSize)}</span><button disabled={page>=Math.ceil(filtered.length/pageSize)} onClick={()=>setPage(p=>p+1)}>Next <ArrowRight size={14}/></button></div>}
        </div>
      </div>
    </section>
    <section className="ai-banner"><div className="ai-banner-icon"><Sparkles size={25}/></div><div><div className="eyebrow">YOUR PERSONAL SHOPPING SIDEKICK</div><h2>Too many choices? Let’s make it easy.</h2><p>Tell ShopSphere AI your budget, preferences, or the problem you want to solve.</p></div><button className="button button-dark" onClick={()=>props.setAssistantOpen(true)}>Find my perfect pick <ArrowRight size={17}/></button></section>
    <section className="section-block recently-loved"><div className="section-heading"><div><div className="eyebrow">THE CROWD HAS TASTE</div><h2>Community favourites</h2></div><span className="muted-text">Rated by shoppers like you.</span></div><div className="product-grid">{[...products].sort((a,b)=>(b.rating||0)-(a.rating||0)).slice(0,4).map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist}/>)}</div></section>
  </div>
}

function ProductPage({ products, addToCart, toggleWishlist, wishlist, reviews, setReviews, notify }) {
  const { id } = useParams(); const product = products.find(p=>String(p.id)===id); const [qty,setQty] = useState(1); const [review,setReview] = useState(''); const [rating,setRating] = useState(5)
  if (!product) return <div className="page-container"><div className="empty-state"><h2>Product not found</h2><Link to="/" className="button button-dark">Back to shop</Link></div></div>
  const saved = wishlist.some(x=>x.id===product.id); const discounted = Math.round(product.price*(1-(product.discountPercentage||0)/100)); const ownReviews = reviews[product.id] || []
  return <div className="page-container inner-page"><div className="breadcrumbs"><Link to="/">Discover</Link><ChevronRight size={14}/><span>{product.category}</span><ChevronRight size={14}/><span>{product.title}</span></div><div className="product-detail"><div className="detail-image"><img src={product.thumbnail || product.images?.[0]} alt={product.title}/>{product.discountPercentage>0&&<span className="discount-tag">{Math.round(product.discountPercentage)}% OFF</span>}</div><div className="detail-copy"><div className="eyebrow">{product.brand || product.category}</div><h1>{product.title}</h1><div className="detail-rating"><span className="rating-chip"><Star size={13} fill="currentColor"/>{Number(product.rating||4.2).toFixed(1)}</span><span>{product.reviews?.length || 24} ratings</span><span className="stock-label"><span/> In stock</span></div><div className="detail-price"><strong>{money(discounted)}</strong>{product.discountPercentage>0&&<><del>{money(product.price)}</del><span>{Math.round(product.discountPercentage)}% off</span></>}</div><p className="detail-description">{product.description}</p><div className="detail-highlights"><div><Truck size={18}/><span>Delivery in 2–5 days</span></div><div><ShieldCheck size={18}/><span>Secure checkout</span></div><div><RotateCcw size={18}/><span>Easy 7-day returns</span></div></div><div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={14}/></button><b>{qty}</b><button onClick={()=>setQty(q=>Math.min(10,q+1))}><Plus size={14}/></button></div></div><div className="detail-actions"><button className="button button-dark" onClick={()=>addToCart(product,qty)}><ShoppingBag size={18}/> Add to bag</button><button className={`button button-outline ${saved?'is-saved':''}`} onClick={()=>toggleWishlist(product)}><Heart size={18} fill={saved?'currentColor':'none'}/> {saved?'Saved':'Wishlist'}</button></div><div className="detail-note"><PackageCheck size={18}/><span><b>Thoughtfully chosen.</b> Product details and stock are demo data for this project.</span></div></div></div>
    <section className="reviews-section"><div className="section-heading"><div><div className="eyebrow">REAL TALK</div><h2>Reviews & ratings</h2></div><span className="muted-text">{ownReviews.length} community reviews</span></div><form className="review-form" onSubmit={e=>{e.preventDefault();if(!review.trim())return;setReviews(old=>({...old,[product.id]:[{text:review,rating,name:'Guest shopper',date:new Date().toLocaleDateString()},...(old[product.id]||[])]}));setReview('');notify('Thanks for sharing your review')}}><label>Your rating <select value={rating} onChange={e=>setRating(Number(e.target.value))}>{[5,4,3,2,1].map(n=><option key={n} value={n}>{n} stars</option>)}</select></label><textarea value={review} onChange={e=>setReview(e.target.value)} placeholder="What should other shoppers know?" rows="3"/><button className="button button-dark" type="submit">Post review</button></form><div className="review-list">{ownReviews.length?ownReviews.map((r,i)=><div className="review-item" key={i}><div className="review-avatar">{(r.name||'G')[0].toUpperCase()}</div><div><b>{r.name||'Guest shopper'}</b><div className="review-stars">{'★'.repeat(r.rating||5)}<span>{r.date||'Recently'}</span></div><p>{r.text}</p></div></div>):<div className="review-placeholder"><Star size={19}/><span>No written reviews yet. Be the first to share your experience.</span></div>}</div></section>
    <section className="section-block"><div className="section-heading"><div><div className="eyebrow">KEEP EXPLORING</div><h2>You might also like</h2></div></div><div className="product-grid">{products.filter(p=>p.id!==product.id && (p.category===product.category || p.brand===product.brand)).slice(0,4).map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist}/>)}</div></section>
  </div>
}

function CartPage({cart,changeQty,removeCart}) {
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0); const delivery=subtotal===0||subtotal>=999?0:79
  return <div className="page-container inner-page"><div className="page-title-row"><div><div className="eyebrow">YOUR PICKS, ALL IN ONE PLACE</div><h1>Your shopping bag <span className="muted-inline">({cart.reduce((s,x)=>s+x.qty,0)} items)</span></h1></div><Link to="/" className="text-link">Continue shopping <ArrowRight size={15}/></Link></div>
    {!cart.length?<div className="empty-state large-empty"><div className="empty-icon"><ShoppingBag size={31}/></div><h2>Your bag is taking a little break.</h2><p>Find something you love and it’ll show up here.</p><Link to="/" className="button button-dark">Explore the collection <ArrowRight size={17}/></Link></div>:<div className="cart-layout"><div className="cart-items">{cart.map(p=><div className="cart-item" key={p.id}><Link to={`/product/${p.id}`} className="cart-thumb"><img src={p.thumbnail} alt={p.title}/></Link><div className="cart-item-info"><Link to={`/product/${p.id}`} className="cart-item-title">{p.title}</Link><span className="product-brand">{p.brand||p.category}</span><strong>{money(p.price)}</strong><div className="quantity-control"><button onClick={()=>changeQty(p.id,-1)}><Minus size={13}/></button><b>{p.qty}</b><button onClick={()=>changeQty(p.id,1)}><Plus size={13}/></button></div></div><div className="cart-item-end"><b>{money(p.price*p.qty)}</b><button className="remove-button" onClick={()=>removeCart(p.id)}><Trash2 size={15}/> Remove</button></div></div>)}</div><aside className="order-summary"><h3>Order summary</h3><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery</span><b>{delivery?money(delivery):'FREE'}</b></div><div className="summary-savings"><Sparkles size={15}/> {subtotal>=999?'You unlocked free delivery!':'Add '+money(999-subtotal)+' for free delivery'}</div><div className="summary-total"><span>Total</span><strong>{money(subtotal+delivery)}</strong></div><Link to="/checkout" className="button button-dark button-full">Continue to checkout <ArrowRight size={17}/></Link><p className="secure-note"><ShieldCheck size={15}/> Secure demo checkout</p></aside></div>}
  </div>
}

function WishlistPage({wishlist,addToCart,toggleWishlist}) {
  return <div className="page-container inner-page"><div className="page-title-row"><div><div className="eyebrow">SAVED FOR LATER</div><h1>Your wishlist</h1></div><span className="muted-text">{wishlist.length} saved items</span></div>{wishlist.length?<div className="product-grid">{wishlist.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist}/>)}</div>:<div className="empty-state large-empty"><div className="empty-icon"><Heart size={30}/></div><h2>A little list of things you love.</h2><p>Tap the heart on any product to save it here.</p><Link to="/" className="button button-dark">Find your favourites</Link></div>}</div>
}

function LoginPage({login,register}) {
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const nav=useNavigate()
  return <div className="auth-page"><div className="auth-card"><Link to="/" className="brand auth-brand"><span className="brand-mark"><ShoppingBag size={21}/></span><span>shop<span className="brand-ai">sphere</span><small>AI</small></span></Link><div className="eyebrow">{register?'JOIN THE GOOD FINDS CLUB':'GOOD TO SEE YOU AGAIN'}</div><h1>{register?'Create your account':'Welcome back.'}</h1><p>{register?'Create an account to keep your picks, orders, and preferences together.':'Sign in to pick up where you left off.'}</p><form onSubmit={e=>{e.preventDefault();if(!email.includes('@')){setError('Please enter a valid email address.');return}if(password.length<4){setError('Password must contain at least 4 characters.');return}login(email,password,name);nav('/') }} className="auth-form">{register&&<label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/></label>}<label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 4 characters" required/></label>{error&&<p className="form-error">{error}</p>}<button className="button button-dark button-full" type="submit">{register?'Create account':'Sign in'} <ArrowRight size={17}/></button></form><div className="auth-switch">{register?'Already have an account?':'New to ShopSphere?'} <Link to={register?'/login':'/register'}>{register?'Sign in':'Create an account'}</Link></div><div className="demo-credentials"><b>Demo admin access</b><span>Email: admin@shopsphere.ai</span><span>Password: any 4+ characters</span><small>Demo only — authentication is stored locally in this browser.</small></div></div></div>
}

function CheckoutPage({cart,user,submitOrder,notify}) {
  const nav=useNavigate(); const [form,setForm]=useState({name:user?.name||'',email:user?.email||'',phone:'',address:'',city:'',pincode:'',payment:'Cash on delivery'})
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0); const update=(key,value)=>setForm(f=>({...f,[key]:value}))
  if(!cart.length)return <div className="page-container inner-page"><div className="empty-state large-empty"><div className="empty-icon"><ShoppingBag/></div><h2>Your bag is empty</h2><Link to="/" className="button button-dark">Shop now</Link></div></div>
  return <div className="page-container inner-page"><div className="breadcrumbs"><Link to="/cart">Bag</Link><ChevronRight size={14}/><span>Checkout</span></div><div className="checkout-title"><div className="eyebrow">ALMOST YOURS</div><h1>Let's get it to you.</h1><p>Complete the details below to place your demo order.</p></div><form className="checkout-layout" onSubmit={e=>{e.preventDefault();const order=submitOrder(form);nav('/orders',{state:{newOrder:order}})}}><div className="checkout-form"><section className="form-section"><div className="form-section-heading"><span>01</span><div><h3>Delivery details</h3><p>Where should we send your good finds?</p></div></div><div className="form-grid"><label>Full name<input required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Your full name"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com"/></label><label>Phone number<input required value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="10-digit mobile number" pattern="[0-9+ -]{10,15}"/></label><label>PIN code<input required value={form.pincode} onChange={e=>update('pincode',e.target.value)} placeholder="6-digit PIN" pattern="[0-9]{6}"/></label><label className="full-field">Address<input required value={form.address} onChange={e=>update('address',e.target.value)} placeholder="House no., street, area"/></label><label className="full-field">City / Town<input required value={form.city} onChange={e=>update('city',e.target.value)} placeholder="Your city"/></label></div></section><section className="form-section"><div className="form-section-heading"><span>02</span><div><h3>Payment method</h3><p>Choose how you’d like to pay.</p></div></div><label className="payment-option"><input type="radio" checked={form.payment==='Cash on delivery'} onChange={()=>update('payment','Cash on delivery')}/><span><b>Cash on delivery</b><small>Pay when your order arrives</small></span><span className="payment-tag">Popular</span></label><label className="payment-option"><input type="radio" checked={form.payment==='Demo online payment'} onChange={()=>update('payment','Demo online payment')}/><span><b>Online payment (demo)</b><small>No real payment will be processed</small></span></label></section></div><aside className="order-summary checkout-summary"><h3>Your order</h3>{cart.map(p=><div className="checkout-product" key={p.id}><img src={p.thumbnail} alt={p.title}/><div><b>{p.title}</b><small>Qty: {p.qty}</small></div><strong>{money(p.price*p.qty)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>{money(subtotal+(subtotal>=999?0:79))}</strong></div><button className="button button-dark button-full" type="submit">Place demo order <ArrowRight size={17}/></button><p className="secure-note"><ShieldCheck size={15}/> No real payment is collected.</p></aside></form></div>
}

function OrdersPage({orders,user}) {
  const mine=orders.filter(o=>!user||user.role==='admin'||o.email===user.email)
  return <div className="page-container inner-page"><div className="page-title-row"><div><div className="eyebrow">THE JOURNEY AFTER CHECKOUT</div><h1>Your orders</h1></div><Link to="/" className="text-link">Shop more <ArrowRight size={15}/></Link></div>{mine.length?<div className="orders-list">{mine.map(o=><article className="order-card" key={o.id}><div className="order-card-top"><div><span className="order-label">ORDER NUMBER</span><b>{o.id}</b><small>Placed {new Date(o.date).toLocaleDateString()}</small></div><span className={`status-pill ${o.status.toLowerCase()}`}>{o.status}</span></div><div className="order-card-products">{o.items.map(p=><div key={p.id}><img src={p.thumbnail} alt={p.title}/><span>{p.title} <small>× {p.qty}</small></span></div>)}</div><div className="order-card-bottom"><span>Delivering to {o.customer} · {o.address}</span><strong>{money(o.total)}</strong></div><div className="order-timeline"><span className="timeline-done"><Check size={12}/></span><div><b>Order received</b><small>Your order is confirmed in this demo store.</small></div><span className="timeline-line"/><span className={o.status!=='Processing'?'timeline-done':'timeline-node'}>{o.status!=='Processing'&&<Check size={12}/>}</span><div><b>Preparing your order</b><small>Status updates are managed by the demo admin.</small></div></div></article>)}</div>:<div className="empty-state large-empty"><div className="empty-icon"><PackageCheck size={31}/></div><h2>Your next delivery starts here.</h2><p>Once you place an order, it’ll appear here with its status.</p><Link to="/" className="button button-dark">Start shopping</Link></div>}</div>
}

function AccountPage({user,logout,orders,wishlist}) {
  if(!user)return <div className="page-container inner-page"><div className="empty-state large-empty"><div className="empty-icon"><CircleUserRound/></div><h2>Your account, your corner.</h2><p>Sign in to view your profile and order history.</p><Link to="/login" className="button button-dark">Sign in</Link></div></div>
  return <div className="page-container inner-page"><div className="eyebrow">YOUR SHOPSPHERE</div><h1 className="account-title">Hey, {user.name}.</h1><p className="muted-text">A little home for your shopping life.</p><div className="account-grid"><div className="account-profile"><div className="profile-avatar">{user.name[0]?.toUpperCase()}</div><h3>{user.name}</h3><p>{user.email}</p><span className="role-chip">{user.role}</span><button className="button button-outline button-full" onClick={logout}><LogOut size={16}/> Sign out</button></div><div className="account-stat-cards"><Link to="/orders" className="account-stat"><span><PackageCheck/></span><div><strong>{orders.filter(o=>o.email===user.email).length}</strong><b>Orders placed</b><small>Track your deliveries</small></div><ChevronRight/></Link><Link to="/wishlist" className="account-stat"><span><Heart/></span><div><strong>{wishlist.length}</strong><b>Saved favourites</b><small>Your wishlist collection</small></div><ChevronRight/></Link><Link to="/" className="account-stat"><span><Sparkles/></span><div><strong>AI</strong><b>Personalised picks</b><small>Discover something new</small></div><ChevronRight/></Link>{user.role==='admin'&&<Link to="/admin" className="account-stat"><span><LayoutDashboard/></span><div><strong>Admin</strong><b>Store dashboard</b><small>Manage the demo store</small></div><ChevronRight/></Link>}</div></div></div>
}

function AdminPage({user,products,setProducts,orders,setOrders,analytics,notify}) {
  const [tab,setTab]=useState('overview'); const [search,setSearch]=useState(''); const [productForm,setProductForm]=useState({title:'',price:'',category:'electronics',thumbnail:'https://placehold.co/600x500/f0f1f7/7a7d91?text=New+Product'}); const [editing,setEditing]=useState(null)
  if(!user||user.role!=='admin')return <div className="page-container inner-page"><div className="empty-state large-empty"><div className="empty-icon"><ShieldCheck/></div><h2>Admin access required</h2><p>Sign in with the demo admin account to manage the store.</p><Link to="/login" className="button button-dark">Admin sign in</Link></div></div>
  const revenue=orders.reduce((s,o)=>s+o.total,0); const lowStock=products.filter(p=>(p.stock||0)<10)
  const saveProduct=e=>{e.preventDefault();if(editing){setProducts(old=>old.map(p=>p.id===editing?{...p,...productForm,price:Number(productForm.price),stock:Number(productForm.stock||10)}:p));notify('Product updated')}else{setProducts(old=>[{...productForm,id:Date.now(),price:Number(productForm.price),stock:Number(productForm.stock||10),rating:4.3,discountPercentage:0,brand:'ShopSphere',description:'A new product added to the local demo catalogue.',tags:[productForm.category]},...old]);notify('Product added')}setProductForm({title:'',price:'',category:'electronics',thumbnail:'https://placehold.co/600x500/f0f1f7/7a7d91?text=New+Product',stock:'10'});setEditing(null)}
  return <div className="admin-page"><div className="admin-header"><div><div className="eyebrow">SHOPSPHERE CONTROL ROOM</div><h1>Store dashboard</h1><p>Good morning, {user.name}. Here's what's happening in your store.</p></div><span className="admin-mode"><span/> Local demo analytics</span></div><div className="admin-tabs">{[['overview','Overview'],['products','Products'],['orders','Orders'],['recommendations','AI analytics']].map(([v,l])=><button key={v} className={tab===v?'active':''} onClick={()=>setTab(v)}>{l}</button>)}</div>
  {tab==='overview'&&<><div className="admin-metrics"><div className="metric-card"><span className="metric-icon purple"><TrendingUp/></span><small>Total revenue <em>simulated</em></small><strong>{money(revenue)}</strong><span className="metric-foot">From {orders.length} demo orders</span></div><div className="metric-card"><span className="metric-icon peach"><ShoppingBag/></span><small>Orders</small><strong>{orders.length}</strong><span className="metric-foot">All order statuses</span></div><div className="metric-card"><span className="metric-icon mint"><Boxes/></span><small>Products</small><strong>{products.length}</strong><span className="metric-foot">{lowStock.length} low-stock alerts</span></div><div className="metric-card"><span className="metric-icon yellow"><Users/></span><small>AI interactions</small><strong>{analytics.impressions}</strong><span className="metric-foot">Local assistant activity</span></div></div><div className="admin-content-grid"><section className="admin-panel"><div className="panel-heading"><div><h3>Recent orders</h3><p>Latest customer checkouts</p></div><button className="text-button" onClick={()=>setTab('orders')}>View all <ArrowRight size={14}/></button></div>{orders.slice(0,5).length?orders.slice(0,5).map(o=><div className="admin-order-row" key={o.id}><span className="order-mini-icon"><PackageCheck size={17}/></span><div><b>{o.customer}</b><small>{o.id} · {new Date(o.date).toLocaleDateString()}</small></div><strong>{money(o.total)}</strong><span className="status-pill">{o.status}</span></div>):<div className="admin-empty">Orders will appear here after a demo checkout.</div>}</section><section className="admin-panel"><div className="panel-heading"><div><h3>Low stock alerts</h3><p>Products with fewer than 10 units</p></div><span className="alert-count">{lowStock.length}</span></div>{lowStock.length?lowStock.slice(0,6).map(p=><div className="low-stock-row" key={p.id}><img src={p.thumbnail} alt={p.title}/><div><b>{p.title}</b><small>{p.brand||p.category}</small></div><span className="stock-warning">{p.stock} left</span></div>):<div className="admin-empty">Everything looks well stocked.</div>}</section></div></>}
  {tab==='products'&&<div className="admin-panel"><div className="panel-heading"><div><h3>Product catalogue</h3><p>Add, edit, or remove products. Changes stay in this browser.</p></div></div><form className="admin-product-form" onSubmit={saveProduct}><input placeholder="Product name" value={productForm.title} onChange={e=>setProductForm(f=>({...f,title:e.target.value}))} required/><input placeholder="Price (₹)" type="number" min="1" value={productForm.price} onChange={e=>setProductForm(f=>({...f,price:e.target.value}))} required/><select value={productForm.category} onChange={e=>setProductForm(f=>({...f,category:e.target.value}))}><option value="electronics">Electronics</option><option value="audio">Audio</option><option value="fashion">Fashion</option><option value="home">Home</option><option value="wearables">Wearables</option></select><input placeholder="Stock units" type="number" value={productForm.stock||''} onChange={e=>setProductForm(f=>({...f,stock:e.target.value}))}/><button className="button button-dark" type="submit">{editing?'Save changes':'Add product'} <Plus size={15}/></button>{editing&&<button type="button" className="button button-outline" onClick={()=>{setEditing(null);setProductForm({title:'',price:'',category:'electronics',thumbnail:'https://placehold.co/600x500/f0f1f7/7a7d91?text=New+Product',stock:'10'})}}>Cancel</button>}</form><label className="admin-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."/></label><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>{products.filter(p=>p.title.toLowerCase().includes(search.toLowerCase())).slice(0,40).map(p=><tr key={p.id}><td><div className="table-product"><img src={p.thumbnail} alt=""/><span>{p.title}</span></div></td><td>{p.category}</td><td>{money(p.price)}</td><td><span className={(p.stock||0)<10?'stock-warning':''}>{p.stock??'—'}</span></td><td><button className="table-action" onClick={()=>{setEditing(p.id);setProductForm({title:p.title,price:String(p.price),category:p.category,thumbnail:p.thumbnail,stock:String(p.stock||10)});window.scrollTo({top:0,behavior:'smooth'})}}>Edit</button><button className="table-action danger" onClick={()=>{if(window.confirm('Delete this product from the local catalogue?')){setProducts(old=>old.filter(x=>x.id!==p.id));notify('Product deleted')}}}>Delete</button></td></tr>)}</tbody></table></div></div>}
  {tab==='orders'&&<div className="admin-panel"><div className="panel-heading"><div><h3>Order management</h3><p>Advance the order status to simulate fulfilment.</p></div></div>{orders.length?orders.map(o=><div className="admin-order-manage" key={o.id}><div><b>{o.id}</b><small>{o.customer} · {o.email}</small><small>{o.items.length} item(s) · {money(o.total)}</small></div><select value={o.status} onChange={e=>{setOrders(old=>old.map(x=>x.id===o.id?{...x,status:e.target.value}:x));notify('Order status updated')}}><option>Processing</option><option>Packed</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></div>):<div className="admin-empty">No orders yet. Place one through checkout to test this flow.</div>}</div>}
  {tab==='recommendations'&&<><div className="admin-metrics"><div className="metric-card"><span className="metric-icon purple"><Eye/></span><small>Recommendation impressions</small><strong>{analytics.impressions}</strong><span className="metric-foot">Local analytics</span></div><div className="metric-card"><span className="metric-icon mint"><TrendingUp/></span><small>Assistant matches</small><strong>{analytics.clicks}</strong><span className="metric-foot">Rule-based results</span></div><div className="metric-card"><span className="metric-icon peach"><WandSparkles/></span><small>Strategy modules</small><strong>9</strong><span className="metric-foot">Demo strategy framework</span></div></div><div className="admin-panel"><div className="panel-heading"><div><h3>Recommendation strategy framework</h3><p>Transparent, rule-based demo providers — not a trained ML model.</p></div></div><div className="strategy-grid">{[['Popularity','Ranks highly rated products'],['Content-based','Matches product category and tags'],['User preference','Uses current session choices'],['Collaborative (mock)','Uses category-level crowd signals'],['Context-aware','Applies budget and shopping intent'],['Trending (mock)','Uses rating and discount signals'],['Hybrid','Combines score signals'],['Frequently bought (mock)','Uses related category products'],['Cold-start','Uses popular items for new users']].map(([name,desc])=><div className="strategy-card" key={name}><span><Sparkles size={15}/></span><div><b>{name}</b><small>{desc}</small></div><span className="strategy-status">Ready</span></div>)}</div></div></>}
  </div>
}

function AssistantPanel({products,assistantMessages,setAssistantMessages,assistantReply,setAssistantOpen}) {
  const [message,setMessage]=useState('')
  const send=(text=message)=>{if(!text.trim())return;assistantReply(text);setMessage('')}
  return <div className="assistant-overlay" onClick={e=>{if(e.target===e.currentTarget)setAssistantOpen(false)}}><section className="assistant-panel"><div className="assistant-header"><span className="assistant-logo"><Sparkles size={20}/></span><div><b>Your shopping sidekick</b><small><span/> ShopSphere AI · Rule-based demo</small></div><button className="icon-button" onClick={()=>setAssistantOpen(false)}><X/></button></div><div className="assistant-welcome"><span className="assistant-sparkle"><Sparkles size={22}/></span><h3>Let's find your perfect pick.</h3><p>Tell me what you need. I'll use your budget and preferences to narrow things down.</p><div className="suggestion-chips">{['Headphones under ₹3000','Best rated home products','Affordable electronics'].map(s=><button key={s} onClick={()=>send(s)}>{s}</button>)}</div></div><div className="assistant-messages">{assistantMessages.map((m,i)=><div key={i} className={`assistant-message ${m.role}`}>{m.role==='assistant'&&<span className="message-avatar"><Sparkles size={13}/></span>}<div>{m.text}{m.productIds?.length>0&&<div className="assistant-products">{m.productIds.map(id=>{const p=products.find(x=>x.id===id);return p?<Link to={`/product/${p.id}`} onClick={()=>setAssistantOpen(false)} key={p.id}><img src={p.thumbnail} alt=""/><span>{p.title}<b>{money(p.price)}</b></span><ChevronRight size={14}/></Link>:null})}</div>}</div></div>)}</div><form className="assistant-input" onSubmit={e=>{e.preventDefault();send()}}><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell me what you're looking for..." aria-label="Ask shopping assistant"/><button type="submit" disabled={!message.trim()} aria-label="Send message"><Send size={17}/></button></form><div className="assistant-disclaimer">Demo assistant · No paid AI service connected</div></section></div>
}

function NotFound(){return <div className="page-container inner-page"><div className="empty-state large-empty"><h1>Looks like a wrong turn.</h1><p>This page hasn't made it into our collection.</p><Link to="/" className="button button-dark">Back to discovering</Link></div></div>}
function Footer(){return <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark"><ShoppingBag size={21}/></span><span>shop<span className="brand-ai">sphere</span><small>AI</small></span></Link><p>Good finds, made personal.<br/>A little more you in every choice.</p></div><div><b>Explore</b><Link to="/">Discover</Link><Link to="/wishlist">Wishlist</Link><Link to="/cart">Shopping bag</Link></div><div><b>Your account</b><Link to="/account">My account</Link><Link to="/orders">Order history</Link><Link to="/login">Sign in</Link></div><div className="footer-newsletter"><b>A note from us</b><p>Thoughtful picks. Fewer tabs. Better finds.</p><span><Sparkles size={15}/> Personal shopping, powered by intelligence.</span></div></div><div className="footer-bottom"><span>© 2026 ShopSphere AI · Student project demo</span><span>Mock checkout · Local data · No real payments</span></div></footer>}

export default App
