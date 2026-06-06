import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import flet as ft

# ==========================================
# DATA — MATLAB COURSES
# ==========================================
matlab_courses = [
    {
        "name": "Calculations with Vectors and Matrices",
        "date": "26 April 2026",
        "progress": 100,
        "chapters": [
            ("Introduction", 100), ("Operations on Arrays", 100),
            ("Statistical Operations on Matrices", 100), ("Matrix Multiplication", 100),
            ("Moving Window Calculations", 100), ("Projects", 100), ("Conclusion", 100),
        ]
    },
    {
        "name": "Make and Manipulate Matrices",
        "date": "26 April 2026",
        "progress": 96,
        "chapters": [
            ("Introduction", 100), ("Array Creation Functions", 80),
            ("Build New Matrices from Existing Matrices", 100),
            ("Extract and Modify Submatrices", 100), ("Projects", 100), ("Conclusion", 100),
        ]
    },
    {
        "name": "Explore Data with MATLAB Plots",
        "date": "26 April 2026",
        "progress": 96,
        "chapters": [
            ("Introduction", 100), ("Visualize Vectors", 100), ("Customize Axes", 100),
            ("Plot Data for Comparison", 87), ("Plotting Outside of Live Scripts", 100),
            ("Project", 100), ("Conclusion", 100),
        ]
    },
    {
        "name": "MATLAB Onramp",
        "date": "25 April 2026",
        "progress": 91,
        "chapters": [
            ("Commands", 100), ("MATLAB Desktop and Editor", 100),
            ("Vectors and Matrices", 100), ("Array Indexing and Modification", 100),
            ("Array Calculations", 100), ("Function Calls", 100),
            ("Plots", 50), ("Data Import", 100), ("Logical Arrays", 100),
            ("Programming", 100), ("Final Project", 0), ("Conclusion", 100),
        ]
    },
    {
        "name": "Simulink Onramp",
        "date": "26 April 2026",
        "progress": 89,
        "chapters": [
            ("Course Overview", 100), ("Simulink Graphical Environment", 75),
            ("Inspecting Signals", 66), ("Basic Algorithms", 100),
            ("Project - Automotive Performance Modes", 100), ("Simulink and MATLAB", 66),
            ("Dynamic systems in Simulink", 100), ("Discrete systems", 100),
            ("Continuous systems", 100), ("Project - Modeling a Thermostat", 66),
            ("Project - Peregrine Falcon Dive", 100), ("Conclusion", 100),
        ]
    },
    {
        "name": "Solve Higher-Order ODEs",
        "date": "29 April 2026",
        "progress": 88,
        "chapters": [
            ("Introduction", 100), ("Identify Higher-Order ODEs", 100),
            ("Initial Conditions and Solutions", 100),
            ("Second-Order Problems as First-Order Systems", 100),
            ("Third-Order Problems as First-Order Systems", 100),
            ("Course Projects", 0), ("Conclusion", 100),
        ]
    },
]

# ==========================================
# HELPERS
# ==========================================
def progress_color(p):
    if p == 100:
        return "#4CAF50"
    elif p >= 90:
        return "#FFC107"
    else:
        return "#2196F3"

def status_label(p):
    if p == 100:
        return "100% — Certified"
    elif p >= 90:
        return f"{p}% — Certified"
    else:
        return f"{p}% — Certified"

def chapter_color(p):
    if p == 100:
        return "#4CAF50"
    elif p > 0:
        return "#FFC107"
    else:
        return "#555"

# ==========================================
# BUILD MATLAB COURSE CARD
# ==========================================
def build_course_card(course):
    color = progress_color(course["progress"])

    chapter_chips = []
    for ch_name, ch_pct in course["chapters"]:
        dot_color = chapter_color(ch_pct)
        chapter_chips.append(
            ft.Row([
                ft.Container(width=8, height=8, bgcolor=dot_color, border_radius=4),
                ft.Text(f"{ch_name} ({ch_pct}%)", size=11, color="#95989A"),
            ], spacing=5)
        )

    chapters_grid = ft.Row(
        controls=[ft.Column(chapter_chips[i::2], spacing=4, expand=True) for i in range(2)],
        spacing=10
    )

    return ft.Container(
        content=ft.Column([
            ft.Row([
                ft.Column([
                    ft.Text(course["name"], size=14, weight="bold", color="#FFFFFF"),
                    ft.Text(f"Completed {course['date']}", size=11, color="#95989A"),
                ], expand=True, spacing=3),
                ft.Container(
                    content=ft.Text(status_label(course["progress"]), size=11, color=color, weight="bold"),
                    padding=5,
                    bgcolor="#20232B",
                    border_radius=4,
                )
            ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
            ft.Row([
                ft.ProgressBar(value=course["progress"] / 100, color=color, bgcolor="#20232B", expand=True),
                ft.Text(f"{course['progress']}%", size=11, color=color, weight="bold"),
            ], spacing=10),
            ft.Divider(color="#20232B", height=1),
            chapters_grid,
        ], spacing=8),
        padding=15,
        bgcolor="#14161D",
        border_radius=8,
        border=ft.border.Border(left=ft.BorderSide(2, color)),
    )

# ==========================================
# MAIN APP
# ==========================================
def main(page: ft.Page):
    page.title = "WILLHEM HISHONGWA 225079224 portfolio"
    page.scroll = "adaptive"
    page.bgcolor = "#0B0C10"
    page.padding = 20

    current_tab = {"index": 0}

    # ---- NAVBAR ----
    def nav_click(tab_index):
        current_tab["index"] = tab_index
        content_area.controls.clear()
        content_area.controls.append(build_page(tab_index))
        page.update()

    navbar = ft.Container(
        content=ft.Row([
            ft.Text("WILLHEM HISHONGWA Portfolio", size=18, weight="bold", color="#FFFFFF"),
            ft.Row([
                ft.ElevatedButton("Timeline", on_click=lambda _: nav_click(0)),
                ft.ElevatedButton("MATLAB", on_click=lambda _: nav_click(1)),
                ft.ElevatedButton("Blog", on_click=lambda _: nav_click(2)),
                ft.ElevatedButton("GitHub", on_click=lambda _: nav_click(3)),
            ], spacing=10)
        ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
        padding=10,
        bgcolor="#14161D",
        border_radius=8
    )

    # ---- TIMELINE PAGE ----
    def build_timeline_page():
        progress_section = ft.Container(
            content=ft.Column([
                ft.Text("Project Timeline", size=22, weight="bold", color="#FFFFFF"),
                ft.Text("Weekly log of my individual contributions to the group project.", size=12, color="#95989A"),
                ft.Row([
                    ft.Text("0 of 6 weeks completed", size=11, color="#95989A"),
                    ft.Text("0%", size=11, color="#4CAF50", weight="bold"),
                ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
                ft.ProgressBar(value=0.0, color="#4CAF50", bgcolor="#20232B"),
            ], spacing=10),
            padding=20, bgcolor="#14161D", border_radius=10
        )

        def stat_box(num, label, color="#FFFFFF"):
            return ft.Container(
                content=ft.Column([
                    ft.Text(num, size=24, weight="bold", color=color),
                    ft.Text(label, size=11, color="#95989A")
                ], horizontal_alignment=ft.CrossAxisAlignment.CENTER, alignment=ft.MainAxisAlignment.CENTER),
                bgcolor="#14161D", padding=15, border_radius=8, expand=True
            )

        stats_row = ft.Row([
            stat_box("6", "Total Weeks"),
            stat_box("0", "Completed", "#4CAF50"),
            stat_box("6", "Remaining", "#FFC107"),
        ], spacing=15)

        week_1_card = ft.Container(
            content=ft.Row([
                ft.Column([
                    ft.Row([
                        ft.Text("Week 1", size=12, weight="bold", color="#4CAF50"),
                        ft.Text("Dates: [Insert Date Range Here]", size=11, color="#95989A"),
                    ], spacing=10),
                    ft.Text("[Insert Your Week 1 Title Here]", size=14, weight="bold", color="#FFFFFF"),
                    ft.Text("[Type a brief sentence here explaining exactly what you did for the project this week.]", size=12, color="#BAC0C4"),
                    ft.Row([
                        ft.Container(content=ft.Text("Tag 1", size=10, color="#FFFFFF"), bgcolor="#2E3440", padding=5, border_radius=4),
                        ft.Container(content=ft.Text("Tag 2", size=10, color="#FFFFFF"), bgcolor="#2E3440", padding=5, border_radius=4),
                    ], spacing=5)
                ], expand=True, spacing=5),
                ft.Text("In Progress", size=12, color="#FFC107", weight="bold")
            ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN, vertical_alignment=ft.CrossAxisAlignment.CENTER),
            padding=15, bgcolor="#14161D", border_radius=8
        )

        return ft.Column([
            progress_section,
            stats_row,
            ft.Text("My Weekly Contributions", size=16, weight="bold", color="#FFFFFF"),
            week_1_card,
        ], spacing=15)

    # ---- MATLAB PAGE ----
    def build_matlab_page():
        avg = round(sum(c["progress"] for c in matlab_courses) / len(matlab_courses))
        perfect = sum(1 for c in matlab_courses if c["progress"] == 100)

        header = ft.Container(
            content=ft.Column([
                ft.Text("MATLAB Certifications", size=22, weight="bold", color="#FFFFFF"),
                ft.Text("MathWorks Training Services — completed April 2026", size=12, color="#95989A"),
                ft.Row([
                    ft.Container(
                        content=ft.Column([
                            ft.Text(str(len(matlab_courses)), size=24, weight="bold", color="#FFFFFF"),
                            ft.Text("Courses", size=11, color="#95989A")
                        ], horizontal_alignment=ft.CrossAxisAlignment.CENTER),
                        bgcolor="#20232B", padding=15, border_radius=8, expand=True
                    ),
                    ft.Container(
                        content=ft.Column([
                            ft.Text(str(perfect), size=24, weight="bold", color="#4CAF50"),
                            ft.Text("100% Complete", size=11, color="#95989A")
                        ], horizontal_alignment=ft.CrossAxisAlignment.CENTER),
                        bgcolor="#20232B", padding=15, border_radius=8, expand=True
                    ),
                    ft.Container(
                        content=ft.Column([
                            ft.Text(f"{avg}%", size=24, weight="bold", color="#FFC107"),
                            ft.Text("Avg. Progress", size=11, color="#95989A")
                        ], horizontal_alignment=ft.CrossAxisAlignment.CENTER),
                        bgcolor="#20232B", padding=15, border_radius=8, expand=True
                    ),
                ], spacing=10),
            ], spacing=12),
            padding=20, bgcolor="#14161D", border_radius=10
        )

        course_cards = [build_course_card(c) for c in matlab_courses]

        return ft.Column([
            header,
            ft.Text("Course Details", size=16, weight="bold", color="#FFFFFF"),
            *course_cards,
        ], spacing=15)

    # ---- PLACEHOLDER PAGES ----
    def build_placeholder(title):
        return ft.Container(
            content=ft.Column([
                ft.Text(title, size=22, weight="bold", color="#FFFFFF"),
                ft.Text("This section is coming soon.", size=14, color="#95989A"),
            ], spacing=10),
            padding=20, bgcolor="#14161D", border_radius=10
        )

    # ---- PAGE ROUTER ----
    def build_page(index):
        if index == 0:
            return build_timeline_page()
        elif index == 1:
            return build_matlab_page()
        elif index == 2:
            return build_placeholder("Blog")
        else:
            return build_placeholder("GitHub")

    content_area = ft.Column(controls=[build_timeline_page()])

    page.add(navbar)
    page.add(ft.Text(""))
    page.add(content_area)

ft.app(target=main)
