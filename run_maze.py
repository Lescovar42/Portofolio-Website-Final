import time, random, sys, collections, warnings
import numpy as np
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.gridspec as gridspec
from matplotlib.colors import ListedColormap, LinearSegmentedColormap
from pathlib import Path
warnings.filterwarnings('ignore')

# ── Output directory
OUT = Path('ieee_figures')
OUT.mkdir(exist_ok=True)

# ── IEEE column widths (inches)
IEEE_COL1 = 3.5      # single column
IEEE_COL2 = 7.16     # double column
IEEE_H    = 2.4      # default panel height

# ── Global rcParams: Times New Roman, 8 pt, 600 dpi export
plt.rcParams.update({
    'font.family'         : 'serif',
    'font.serif'          : ['Times New Roman', 'Times', 'DejaVu Serif'],
    'font.size'           : 8,
    'axes.titlesize'      : 8,
    'axes.labelsize'      : 8,
    'xtick.labelsize'     : 7,
    'ytick.labelsize'     : 7,
    'legend.fontsize'     : 7,
    'legend.title_fontsize': 7,
    'lines.linewidth'     : 1.2,
    'lines.markersize'    : 4,
    'axes.linewidth'      : 0.6,
    'patch.linewidth'     : 0.6,
    'axes.grid'           : True,
    'grid.linewidth'      : 0.4,
    'grid.alpha'          : 0.45,
    'grid.color'          : '#AAAAAA',
    'axes.spines.top'     : False,
    'axes.spines.right'   : False,
    'figure.dpi'          : 150,
    'savefig.dpi'         : 600,
    'savefig.bbox'        : 'tight',
    'savefig.pad_inches'  : 0.02,
    'figure.constrained_layout.use': True,
})

# ── Colour-blind-safe palette (IEEE print-safe)
PAL     = {'DC': '#1f77b4', 'BT': '#2ca02c', 'PR': '#d62728'}
MARKERS = {'DC': 'o',       'BT': 's',       'PR': '^'}
LABELS  = {'DC': 'Divide and Conquer',
           'BT': 'Backtracking',
           'PR': 'Algoritma Prim'}

def save(fig, name, fmts=('png', 'pdf')):
    for fmt in fmts:
        fig.savefig(OUT / f'{name}.{fmt}')
    print(f'  saved: {name}  ({", ".join(fmts)})')

print('IEEE rcParams loaded')
print(f'Single-col: {IEEE_COL1} in  |  Double-col: {IEEE_COL2} in')
print(f'Output dir: {OUT.resolve()}')

# ── Grid helpers
def make_grid(R, C):
    return [[1]*(2*C+1) for _ in range(2*R+1)]

def open_wall(g, r1, c1, r2, c2):
    g[r1+r2][c1+c2] = 0
    g[2*r1+1][2*c1+1] = 0
    g[2*r2+1][2*c2+1] = 0

# ── Recursive Division (Divide and Conquer)
def gen_dc(rows, cols, seed=42):
    rng = random.Random(seed)
    g = [[0]*(2*cols+1) for _ in range(2*rows+1)]
    for c in range(2*cols+1): g[0][c] = g[2*rows][c] = 1
    for r in range(2*rows+1): g[r][0] = g[r][2*cols] = 1

    def divide(rs, cs, H, W):
        if H <= 1 or W <= 1: return
        horiz = (W < H) or (H == W and rng.random() < .5)
        if horiz:
            wr = rng.randrange(rs+1, rs+H)*2
            pc = rng.randrange(cs, cs+W)
            for c in range(cs, cs+W):
                g[wr][2*c+1] = 0 if c == pc else 1
            th = wr//2 - rs
            divide(rs, cs, th, W); divide(rs+th, cs, H-th, W)
        else:
            wc = rng.randrange(cs+1, cs+W)*2
            pr = rng.randrange(rs, rs+H)
            for r in range(rs, rs+H):
                g[2*r+1][wc] = 0 if r == pr else 1
            lw = wc//2 - cs
            divide(rs, cs, H, lw); divide(rs, cs+lw, H, W-lw)

    divide(0, 0, rows, cols)
    return g

# ── Recursive Backtracker (Backtracking / DFS)
def gen_bt(rows, cols, seed=42):
    rng  = random.Random(seed)
    g    = make_grid(rows, cols)
    vis  = [[False]*cols for _ in range(rows)]
    DIRS = [(-1,0),(1,0),(0,-1),(0,1)]
    vis[0][0] = True; g[1][1] = 0
    stack = [(0,0)]
    while stack:
        r, c = stack[-1]
        nbrs = [(r+dr,c+dc) for dr,dc in DIRS
                if 0<=r+dr<rows and 0<=c+dc<cols and not vis[r+dr][c+dc]]
        if nbrs:
            nr,nc = rng.choice(nbrs)
            g[(2*r+1+2*nr+1)//2][(2*c+1+2*nc+1)//2] = 0
            g[2*r+1][2*c+1] = 0
            g[2*nr+1][2*nc+1] = 0
            vis[nr][nc] = True; stack.append((nr,nc))
        else:
            stack.pop()
    return g

# ── Randomized Prim's Algorithm
def gen_pr(rows, cols, seed=42):
    rng  = random.Random(seed)
    g    = make_grid(rows, cols)
    in_m = [[False]*cols for _ in range(rows)]
    DIRS = [(-1,0),(1,0),(0,-1),(0,1)]
    def nbrs(r,c): return [(r+dr,c+dc) for dr,dc in DIRS
                           if 0<=r+dr<rows and 0<=c+dc<cols]
    in_m[0][0] = True; g[1][1] = 0
    front = [(0,0,nr,nc) for nr,nc in nbrs(0,0)]
    while front:
        i = rng.randrange(len(front))
        r1,c1,r2,c2 = front[i]
        front[i] = front[-1]; front.pop()
        if in_m[r2][c2]: continue
        g[(2*r1+1+2*r2+1)//2][(2*c1+1+2*c2+1)//2] = 0
        g[2*r1+1][2*c1+1] = 0
        g[2*r2+1][2*c2+1] = 0
        in_m[r2][c2] = True
        front.extend((r2,c2,nr,nc) for nr,nc in nbrs(r2,c2)
                     if not in_m[nr][nc])
    return g

ALGS = {'DC': gen_dc, 'BT': gen_bt, 'PR': gen_pr}
print('Three maze algorithms defined: DC, BT, PR')

DIRS4 = [(-1,0),(1,0),(0,-1),(0,1)]

def solve_bfs(g, R, C):
    """BFS path length (cell count) from (0,0) to (R-1,C-1)."""
    s,e = (1,1),(2*R-1,2*C-1)
    if g[s[0]][s[1]] or g[e[0]][e[1]]: return -1
    dist = {s:0}; q = collections.deque([s])
    while q:
        r,c = q.popleft()
        if (r,c)==e: return dist[e]//2+1
        for dr,dc in DIRS4:
            nr,nc = r+dr,c+dc; nr2,nc2 = r+2*dr,c+2*dc
            if (0<=nr2<2*R+1 and 0<=nc2<2*C+1
                    and g[nr][nc]==0 and g[nr2][nc2]==0
                    and (nr2,nc2) not in dist):
                dist[(nr2,nc2)] = dist[(r,c)]+2; q.append((nr2,nc2))
    return -1

def dead_ends(g, R, C):
    cnt = 0
    for r in range(R):
        for c in range(C):
            gr,gc = 2*r+1,2*c+1
            op = sum(g[gr+dr][gc+dc]==0 for dr,dc in DIRS4
                     if 0<=gr+dr<2*R+1 and 0<=gc+dc<2*C+1)
            cnt += (op==1)
    return cnt

def branching(g, R, C):
    jb = []
    for r in range(R):
        for c in range(C):
            gr,gc = 2*r+1,2*c+1
            op = sum(g[gr+dr][gc+dc]==0 for dr,dc in DIRS4
                     if 0<=gr+dr<2*R+1 and 0<=gc+dc<2*C+1)
            if op >= 3: jb.append(op)
    return (np.mean(jb), len(jb)) if jb else (0.,0)

def straightness(g, R, C):
    s,e = (1,1),(2*R-1,2*C-1)
    prev={s:None}; q=collections.deque([s])
    while q:
        r,c = q.popleft()
        if (r,c)==e: break
        for dr,dc in DIRS4:
            nr,nc = r+dr,c+dc; nr2,nc2 = r+2*dr,c+2*dc
            if (0<=nr2<2*R+1 and 0<=nc2<2*C+1
                    and g[nr][nc]==0 and g[nr2][nc2]==0
                    and (nr2,nc2) not in prev):
                prev[(nr2,nc2)]=(r,c,dr,dc); q.append((nr2,nc2))
    if e not in prev: return 0.
    dirs,node = [],e
    while prev[node]:
        pr,pc,dr,dc = prev[node]; dirs.append((dr,dc)); node=(pr,pc)
    if len(dirs)<=1: return 1.
    turns = sum(dirs[i]!=dirs[i-1] for i in range(1,len(dirs)))
    return 1-turns/len(dirs)

def solution_path_cells(g, R, C):
    """Return set of grid coords on the BFS solution path."""
    s,e = (1,1),(2*R-1,2*C-1)
    prev={s:None}; q=collections.deque([s])
    while q:
        r,c = q.popleft()
        if (r,c)==e: break
        for dr,dc in DIRS4:
            nr,nc = r+dr,c+dc; nr2,nc2 = r+2*dr,c+2*dc
            if (0<=nr2<2*R+1 and 0<=nc2<2*C+1
                    and g[nr][nc]==0 and g[nr2][nc2]==0
                    and (nr2,nc2) not in prev):
                prev[(nr2,nc2)]=(r,c); q.append((nr2,nc2))
    if e not in prev: return set()
    path,node = set(),e
    while node:
        p=prev[node]; path.add(node)
        if p: path.add(((node[0]+p[0])//2,(node[1]+p[1])//2))
        node=p
    return path

print('Metric functions defined')

GRID_SIZES = [5, 10, 15, 20, 30, 40, 50, 60, 75, 100]
N_RUNS     = 5

rows = []
for key, fn in ALGS.items():
    print(f'\n[{LABELS[key]}]')
    for n in GRID_SIZES:
        times = []
        for run in range(N_RUNS):
            t0 = time.perf_counter()
            g  = fn(n, n, seed=run*137+n)
            times.append((time.perf_counter()-t0)*1000)
        g  = fn(n, n, seed=42)
        pl = solve_bfs(g,n,n)
        de = dead_ends(g,n,n)
        ab,nj = branching(g,n,n)
        st = straightness(g,n,n)
        rows.append(dict(
            key=key, label=LABELS[key], n=n, cells=n*n,
            t_mean=np.mean(times), t_std=np.std(times), t_min=np.min(times),
            path_len=pl, path_ratio=pl/(n*n) if pl>0 else 0,
            dead_ends=de, de_ratio=de/(n*n),
            n_junc=nj, junc_ratio=nj/(n*n),
            avg_branch=ab, straightness=st,
        ))
        print(f'  {n:3d}x{n:<3d}  t={np.mean(times):7.2f}ms '
              f' path={pl:5d}  de={de:5d}({de/(n*n):.1%}) '
              f' junc={nj:4d}  branch={ab:.2f}  str={st:.3f}')

df = pd.DataFrame(rows)
df.to_csv(OUT/'results.csv', index=False)
print(f'\nExperiment complete: {len(df)} records -> {OUT}/results.csv')
df.tail(6)

def power_fit(x, y):
    b, la = np.polyfit(np.log(x), np.log(y), 1)
    return np.exp(la), b

FIT = {}
print(f"{'Algorithm':<22}  {'a':>10}  {'b':>6}  Class")
print('-'*50)
for key in ALGS:
    sub = df[df.key==key].sort_values('n')
    a,b = power_fit(sub.n.values.astype(float), sub.t_mean.values)
    FIT[key] = (a,b)
    print(f'{LABELS[key]:<22}  {a:10.5f}  {b:6.3f}  O(N^{b:.2f})')

SAMPLE_N  = [10, 25, 50]
ALG_KEYS  = list(ALGS.keys())

fig, axes = plt.subplots(len(SAMPLE_N), len(ALG_KEYS),
                         figsize=(IEEE_COL2, IEEE_COL2*0.62))

for col, key in enumerate(ALG_KEYS):
    for row, n in enumerate(SAMPLE_N):
        ax = axes[row][col]
        g  = ALGS[key](n, n, seed=42)
        ax.imshow(np.array(g), cmap='binary',
                  interpolation='nearest', aspect='equal')
        ax.plot(1, 1, 'o', color='#0077BB', ms=4, zorder=5)
        ax.plot(2*n-1, 2*n-1, 's', color='#EE3344', ms=4, zorder=5)
        ax.set_xticks([]); ax.set_yticks([])
        for sp in ax.spines.values(): sp.set_linewidth(0.4)
        if row == 0: ax.set_title(LABELS[key], fontsize=7, pad=3)
        if col == 0: ax.set_ylabel(f'{n}x{n}', fontsize=7, labelpad=2)

legend_els = [
    mpatches.Patch(fc='white', ec='black', lw=0.4, label='Lorong'),
    mpatches.Patch(fc='black', label='Dinding'),
    plt.Line2D([0],[0],marker='o',color='w',markerfacecolor='#0077BB',ms=4,label='Mulai'),
    plt.Line2D([0],[0],marker='s',color='w',markerfacecolor='#EE3344',ms=4,label='Selesai'),
]
fig.legend(handles=legend_els, loc='lower center', ncol=4,
           frameon=False, fontsize=6.5, bbox_to_anchor=(0.5,-0.02))
save(fig, 'fig1_sample_mazes')
# plt.show()

VIZ_N    = 30
path_cmap = LinearSegmentedColormap.from_list(
    'maze_path', ['white','#FF9900','black'], N=256)

fig, axes = plt.subplots(1, 3, figsize=(IEEE_COL2, IEEE_COL2*0.36))

for ax, key in zip(axes, ALG_KEYS):
    n   = VIZ_N
    g   = ALGS[key](n, n, seed=42)
    arr = np.array(g, dtype=float)
    for r,c in solution_path_cells(g,n,n): arr[r][c] = 0.5
    ax.imshow(arr, cmap=path_cmap, interpolation='nearest',
              aspect='equal', vmin=0, vmax=1)
    ax.plot(1,1,'o',color='#0077BB',ms=4,zorder=5)
    ax.plot(2*n-1,2*n-1,'s',color='#EE3344',ms=4,zorder=5)
    ax.set_xticks([]); ax.set_yticks([])
    for sp in ax.spines.values(): sp.set_linewidth(0.4)
    pl = solve_bfs(g,n,n)
    ax.set_title(f'{LABELS[key]}\npanjang jalur = {pl} sel', fontsize=7, pad=3)

save(fig, 'fig2_solution_path')
# plt.show()

fig, (ax1,ax2) = plt.subplots(1,2,figsize=(IEEE_COL2, IEEE_H+0.3))

for key in ALG_KEYS:
    sub = df[df.key==key].sort_values('n')
    c,m = PAL[key], MARKERS[key]
    ax1.plot(sub.n, sub.t_mean, marker=m, color=c, label=LABELS[key])
    ax1.fill_between(sub.n, sub.t_mean-sub.t_std,
                     sub.t_mean+sub.t_std, alpha=0.12, color=c)
    ax2.plot(sub.n, sub.t_mean, marker=m, color=c, label=LABELS[key])
    if key in FIT:
        a,b = FIT[key]
        xd  = np.linspace(sub.n.min(), sub.n.max(), 300)
        ax2.plot(xd, a*xd**b, '--', color=c, lw=0.9, alpha=0.75,
                 label=f'fit $N^{{{b:.2f}}}$')

for ax, title, log in [(ax1,'(a) Skala Linear',False),(ax2,'(b) Skala Log-Log',True)]:
    ax.set_xlabel('Ukuran grid $N$ (sel per sisi)')
    ax.set_ylabel('Waktu eksekusi (ms)')
    ax.set_title(title, loc='left', fontsize=7)
    if log: ax.set_xscale('log'); ax.set_yscale('log')
    ax.legend(frameon=False, fontsize=6)

save(fig, 'fig3_execution_time')
# plt.show()

fig, (ax1,ax2) = plt.subplots(1,2,figsize=(IEEE_COL2, IEEE_H+0.2))

for key in ALG_KEYS:
    sub = df[df.key==key].sort_values('n')
    c,m = PAL[key], MARKERS[key]
    ax1.plot(sub.n, sub.de_ratio,   marker=m, color=c, label=LABELS[key])
    ax2.plot(sub.n, sub.path_ratio, marker=m, color=c, label=LABELS[key])

ax1.set_xlabel('Ukuran grid $N$')
ax1.set_ylabel('Rasio jalan buntu')
ax1.set_title('(a) Rasio jalan buntu = jalan buntu / $N^2$', loc='left', fontsize=7)
ax1.set_ylim(0, None)
ax1.legend(frameon=False, fontsize=6)

ax2.set_xlabel('Ukuran grid $N$')
ax2.set_ylabel('Rasio panjang jalur solusi')
ax2.set_title('(b) Rasio jalur = sel jalur solusi / $N^2$', loc='left', fontsize=7)
ax2.set_ylim(0, None)
ax2.legend(frameon=False, fontsize=6)

save(fig, 'fig4_complexity_metrics')
# plt.show()

fig, (ax1,ax2) = plt.subplots(1,2,figsize=(IEEE_COL2, IEEE_H+0.2))

for key in ALG_KEYS:
    sub = df[df.key==key].sort_values('n')
    c,m = PAL[key], MARKERS[key]
    ax1.plot(sub.n, sub.junc_ratio, marker=m, color=c, label=LABELS[key])
    ax2.plot(sub.n, sub.avg_branch, marker=m, color=c, label=LABELS[key])

ax1.set_xlabel('Ukuran grid $N$')
ax1.set_ylabel('Junction density')
ax1.set_title('(a) Junction density = junctions / $N^2$', loc='left', fontsize=7)
ax1.legend(frameon=False, fontsize=6)

ax2.set_xlabel('Ukuran grid $N$')
ax2.set_ylabel('Avg. branching factor')
ax2.set_title('(b) Avg. branches at junction nodes', loc='left', fontsize=7)
ax2.set_ylim(2.8, 3.6)
ax2.legend(frameon=False, fontsize=6)

save(fig, 'fig5_structural_metrics')
# plt.show()

fig, ax = plt.subplots(figsize=(IEEE_COL1, IEEE_H+0.5))
x_dense = np.linspace(GRID_SIZES[0], GRID_SIZES[-1], 300)

for key in ALG_KEYS:
    sub = df[df.key==key].sort_values('n')
    c,m = PAL[key], MARKERS[key]
    ax.scatter(sub.n, sub.t_mean, color=c, marker=m, s=20, zorder=4)
    if key in FIT:
        a,b = FIT[key]
        ax.plot(x_dense, a*x_dense**b, '-', color=c, lw=1.1,
                label=fr'{LABELS[key]}  $\approx O(N^{{{b:.2f}}})$')

ax.set_xscale('log'); ax.set_yscale('log')
ax.set_xlabel('Ukuran grid $N$ (sel per sisi)')
ax.set_ylabel('Waktu eksekusi (ms)')
ax.set_title('Time complexity: power-law fit ($t=aN^b$)', fontsize=7)
ax.legend(frameon=False, fontsize=6)

for key in ALG_KEYS:
    a,b = FIT[key]
    sub = df[df.key==key]
    xmax = sub.n.max()
    ymax = sub[sub.n==xmax].t_mean.values[0]
    ax.annotate(f'$b={b:.2f}$', xy=(xmax,ymax),
                xytext=(6,0), textcoords='offset points',
                fontsize=6, color=PAL[key], va='center')

save(fig, 'fig6_complexity_fit')
# plt.show()

big = df[df.n==100].copy()

print('TABEL I - PERBANDINGAN ALGORITMA PADA N=100')
print('='*72)
hdr = f"{'Algoritma':<24}  {'Waktu (ms)':>10}  {'Rasio jalur':>11}  "
hdr += f"{'Jln. buntu %':>12}  {'Pers. %':>7}  {'Cabang':>6}"
print(hdr)
print('-'*72)
for _,r in big.iterrows():
    print(f'{r.label:<24}  {r.t_mean:9.2f}  {r.path_ratio:10.4f}  '
          f'{r.de_ratio*100:9.2f}%  {r.junc_ratio*100:6.2f}%  {r.avg_branch:6.3f}')
print('='*72)

print('\n% === LaTeX TABLE I snippet (paste into IEEE .tex) ===')
lines = [
    r'\begin{table}[!t]',
    r'\renewcommand{\arraystretch}{1.2}',
    r'\caption{Perbandingan Algoritma pada $N=100$}',
    r'\label{tab:comparison}',
    r'\centering',
    r'\begin{tabular}{lrrrrc}',
    r'\hline',
    r'\textbf{Algorithm} & \textbf{Time (ms)} & \textbf{Path ratio} & '
    r'\textbf{Dead-end \%} & \textbf{Junc.\ \%} & \textbf{Branch} \\',
    r'\hline',
]
for _,r in big.iterrows():
    nm = r.label.replace("'","'")
    lines.append(f'{nm} & {r.t_mean:.2f} & {r.path_ratio:.4f} & '
                 f'{r.de_ratio*100:.2f}\\% & {r.junc_ratio*100:.2f}\\% & '
                 f'{r.avg_branch:.3f} \\\\')
lines += [r'\hline', r'\end{tabular}', r'\end{table}']
print('\n'.join(lines))

fig = plt.figure(figsize=(IEEE_COL2, IEEE_COL2*0.75))
gs  = gridspec.GridSpec(2, 3, figure=fig, hspace=0.5, wspace=0.4)

panels = [
    ('t_mean',      'Waktu eksekusi (ms)',     '(a) Waktu eksekusi'),
    ('de_ratio',    'Rasio jalan buntu',       '(b) Rasio jalan buntu'),
    ('path_ratio',  'Rasio jalur solusi',      '(c) Rasio jalur solusi'),
    ('junc_ratio',  'Kepadatan persimpangan',  '(d) Kepadatan persimpangan'),
    ('avg_branch',  'Faktor percabangan',      '(e) Faktor percabangan'),
    ('straightness','Kelurusan jalur',         '(f) Kelurusan jalur'),
]

for idx,(col_name,ylabel,title) in enumerate(panels):
    ax = fig.add_subplot(gs[idx//3, idx%3])
    for key in ALG_KEYS:
        sub = df[df.key==key].sort_values('n')
        ax.plot(sub.n, sub[col_name], marker=MARKERS[key],
                color=PAL[key], label=LABELS[key], ms=3)
    ax.set_title(title, loc='left', fontsize=6.5, pad=2)
    ax.set_xlabel('Ukuran grid $N$', fontsize=6.5)
    ax.set_ylabel(ylabel, fontsize=6.5)
    if idx==0: ax.legend(frameon=False, fontsize=5.5, loc='upper left')

save(fig, 'fig7_dashboard')
# plt.show()

print('File dalam ieee_figures/')
print('-'*45)
total = 0
for f in sorted(OUT.iterdir()):
    sz = f.stat().st_size
    total += sz
    print(f'  {f.name:<36} {sz/1024:6.1f} KB')
print('-'*45)
print(f'  {"TOTAL":<36} {total/1024:6.1f} KB')
